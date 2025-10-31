import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { db } from '@/lib/firebase'
import { Timestamp, FieldValue } from 'firebase-admin/firestore'

// Get all reviews from Firestore
async function getReviews() {
  try {
    if (!db) {
      console.error('Firestore not initialized');
      return [];
    }
    
    console.log('Fetching all reviews...');
    const snapshot = await db
      .collection('reviews')
      .orderBy('date', 'desc')
      .get();
    
    console.log(`Found ${snapshot.docs.length} reviews in Firestore`);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Review data:', { id: doc.id, ...data });
      
      // Handle date - use current date if invalid
      let dateValue: string;
      try {
        if (data.date?.toDate) {
          dateValue = data.date.toDate().toISOString();
        } else if (data.date) {
          const date = new Date(data.date);
          dateValue = isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
        } else {
          dateValue = new Date().toISOString();
        }
      } catch (e) {
        console.warn('Error processing date, using current date');
        dateValue = new Date().toISOString();
      }
      
      return {
        id: doc.id,
        name: data.name || 'Anonymous',
        rating: Number(data.rating) || 5,
        comment: data.comment || '',
        company: data.company || '',
        date: dateValue,
        // Include all other fields
        ...Object.fromEntries(
          Object.entries(data)
            .filter(([key]) => !['name', 'rating', 'comment', 'company', 'date'].includes(key))
        )
      };
    });
  } catch (error) {
    console.error('Error getting reviews:', error);
    return [];
  }
}

// Add a new review to Firestore
async function saveReview(review: any) {
  if (!db) {
    throw new Error('Firestore not initialized');
  }
  
  try {
    console.log('Saving new review:', review);
    
    // Ensure we have all required fields with defaults
    const reviewData = {
      name: (review.name || '').trim() || 'Anonymous',
      rating: Math.min(5, Math.max(1, Number(review.rating) || 5)), // Ensure rating is between 1-5
      comment: (review.comment || '').trim(),
      company: (review.company || '').trim(),
      // Always store as Firestore Timestamp for consistency
      date: Timestamp.now(),
      // Set to false for admin approval
      approved: false,
      // Track when the review was created
      createdAt: FieldValue.serverTimestamp()
    };
    
    // Log the processed data for debugging
    console.log('Processed review data for saving:', {
      ...reviewData,
      date: reviewData.date.toDate().toISOString(),
      // Don't log serverTimestamp
    });
    
    console.log('Processed review data for saving:', reviewData);
    const docRef = await db.collection('reviews').add(reviewData);
    
    return { 
      id: docRef.id, 
      ...reviewData,
      // Convert Firestore Timestamp to ISO string for response
      date: reviewData.date.toDate().toISOString(),
      // Remove server-side only fields
      approved: undefined,
      createdAt: undefined
    };
  } catch (error) {
    console.error('Error adding review:', error);
    throw new Error('Failed to save review');
  }
}

// GET - Fetch all reviews
export async function GET() {
  console.log('GET /api/reviews called');
  try {
    console.log('Fetching reviews from Firestore...');
    const reviews = await getReviews();
    console.log(`Found ${reviews.length} approved reviews`);
    return NextResponse.json({ reviews }, { status: 200 })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST - Add new review
export async function POST(request: NextRequest) {
  // Set CORS headers
  const headers = new Headers()
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS, GET')
  headers.set('Access-Control-Allow-Headers', 'Content-Type')

  // Handle OPTIONS request for CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers })
  }

  // Log request for debugging
  console.log('Received request at:', new Date().toISOString());

  try {
    const body = await request.json()
    const { name, rating, comment, company } = body

    // Validate input
    if (!name?.trim() || rating === undefined || !comment?.trim()) {
      return new NextResponse(
        JSON.stringify({ error: 'Name, rating, and comment are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...Object.fromEntries(headers) } }
      )
    }

    const numericRating = Number(rating)
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return new NextResponse(
        JSON.stringify({ error: 'Rating must be a number between 1 and 5' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...Object.fromEntries(headers) } }
      )
    }

    const reviews = await getReviews()
    
    const newReview = {
      id: Date.now().toString(),
      name: name.trim(),
      rating: numericRating,
      comment: comment.trim(),
      company: company?.trim() || '',
      date: new Date().toISOString(),
      approved: true
    }

    const savedReview = await saveReview(newReview)

    try {
      // Send email notification for new review
      const stars = '★'.repeat(numericRating) + '☆'.repeat(5 - numericRating);
      await sendEmail(
        process.env.ADMIN_EMAIL || 'your-email@example.com',
        `New Review from ${name.trim()}`,
        `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4F46E5;">⭐ New Review Received</h2>
            
            <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 24px; color: #F59E0B; margin-right: 10px;">
                  ${stars}
                </div>
                <span style="font-weight: 600;">${name.trim()}</span>
                ${company?.trim() ? `<span style="color: #6B7280; margin-left: 10px;">(${company.trim()})</span>` : ''}
              </div>
              
              <div style="padding: 10px 0; border-top: 1px solid #E5E7EB; margin: 10px 0;">
                <p style="font-style: italic; color: #4B5563;">"${comment.trim()}"</p>
              </div>
              
              <div style="font-size: 12px; color: #9CA3AF; text-align: right;">
                ${new Date().toLocaleString()}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
              <p>View all reviews in your dashboard or moderate this review.</p>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/dashboard/reviews" 
                style="display: inline-block; padding: 8px 16px; background-color: #4F46E5; 
                      color: white; text-decoration: none; border-radius: 6px; margin-top: 10px;">
                View Dashboard
              </a>
            </div>
          </div>
        `
      )
    } catch (emailError) {
      console.error('Failed to send review notification email:', emailError)
      // Don't fail the request if email sending fails
    }

    return new NextResponse(
      JSON.stringify({ 
        success: true, 
        message: 'Review submitted successfully!', 
        review: savedReview 
      }),
      { 
        status: 201, 
        headers: { 'Content-Type': 'application/json', ...Object.fromEntries(headers) } 
      }
    )
  } catch (error) {
    console.error('Error submitting review:', error)
    return new NextResponse(
      JSON.stringify({ 
        success: false,
        error: 'Failed to submit review. Please try again.' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...Object.fromEntries(headers) } 
      }
    )
  }
}
