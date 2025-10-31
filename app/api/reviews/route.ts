import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import path from 'path'
import { sendEmail } from '@/lib/email'

const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await mkdir(path.join(process.cwd(), 'data'), { recursive: true })
  } catch (error) {
    // Directory already exists
  }
}

// Read reviews from file
async function getReviews() {
  try {
    const data = await readFile(REVIEWS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // File doesn't exist yet, return empty array
    return []
  }
}

// Write reviews to file
async function saveReviews(reviews: any[]) {
  await ensureDataDir()
  await writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2))
}

// GET - Fetch all reviews
export async function GET() {
  try {
    const reviews = await getReviews()
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
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type')

  // Handle OPTIONS request for CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers })
  }

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

    const updatedReviews = [newReview, ...reviews]
    await saveReviews(updatedReviews)

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
        review: newReview 
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
