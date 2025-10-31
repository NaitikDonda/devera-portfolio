'use client';

import { motion } from 'framer-motion';
import { Star, User, Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatDate, formatRelativeTime } from '@/lib/utils/date';
import './reviews.css';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  company?: string;
  date: string;
  approved?: boolean;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
    company: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch reviews on component mount
  useEffect(() => {
    console.log('Component mounted, fetching reviews...');
    fetchReviews();
  }, []);

  const fetchReviews = async (showMore = false) => {
    try {
      console.log('fetchReviews called, showMore:', showMore);
      if (showMore) {
        setIsLoadingMore(true);
      } else {
        setStatus('loading');
      }

      console.log('Fetching from /api/reviews...');
      const response = await fetch('/api/reviews');
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch reviews:', response.status, errorText);
        throw new Error(`Failed to fetch reviews: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('Received reviews data:', data);
      console.log('Number of reviews received:', data.reviews?.length || 0);
      setReviews(data.reviews || []);

      if (showMore) {
        setVisibleReviews(prev => Math.min(prev + 3, data.reviews?.length || 0));
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      setStatus('error');
      setResponseMessage('Failed to load reviews. Please try again later.');
    } finally {
      if (showMore) {
        setIsLoadingMore(false);
      } else {
        setStatus('idle');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.comment.trim()) {
      setStatus('error');
      setResponseMessage('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setStatus('loading');
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          rating: Number(formData.rating),
          comment: formData.comment.trim(),
          company: formData.company.trim()
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }
      
      // Refresh the reviews list
      await fetchReviews();
      
      // Reset form
      setFormData({
        name: '',
        rating: 5,
        comment: '',
        company: ''
      });
      
      setStatus('success');
      setResponseMessage('Thank you for your review! It has been submitted for approval.');
    } catch (error) {
      console.error('Error submitting review:', error);
      setStatus('error');
      setResponseMessage(error instanceof Error ? error.message : 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
      
      // Clear success/error message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setResponseMessage('');
      }, 5000);
    }
  };

  // Filter approved reviews
  const approvedReviews = reviews.filter(review => review.approved !== false);
  const visibleReviewsList = approvedReviews.slice(0, visibleReviews);
  const hasMoreReviews = approvedReviews.length > visibleReviews;

  if (status === 'loading' && reviews.length === 0) {
    return (
      <div className="py-16 bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-400">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            What People Say
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients and colleagues have to say about working with me.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Reviews List */}
          <div className="w-full lg:w-2/3">
            <div className="bg-gray-900/50 rounded-2xl p-6 h-[600px] overflow-y-auto custom-scrollbar">
              {approvedReviews.length > 0 ? (
                <div className="space-y-6">
                  {visibleReviewsList.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="review-card p-6 text-white w-full"
                    >
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-indigo-900/50 flex-shrink-0 flex items-center justify-center border-2 border-indigo-600/30 mr-4">
                          <User className="w-6 h-6 text-indigo-300" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                              {review.company && (
                                <p className="text-sm text-indigo-300">{review.company}</p>
                              )}
                            </div>
                            <div className="flex items-center text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-500'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-3 text-gray-300 text-sm sm:text-base">{review.comment}</p>
                          <div className="mt-3 text-right">
                            <span className="text-xs text-gray-400">
                              {formatDate(review.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 border-2 border-dashed border-gray-700 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-gray-400">No reviews yet. Be the first to leave a review!</p>
                  </div>
                </div>
              )}
              
              {hasMoreReviews && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setVisibleReviews(prev => prev + 3)}
                    disabled={isLoadingMore}
                    className="w-full text-white font-medium py-3 px-6 rounded-lg submit-btn"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        Loading...
                      </>
                    ) : (
                      'Load More Reviews'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Review Form - Right Side */}
          <div className="lg:w-1/2">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 sticky top-6">
              <h3 className="text-2xl font-bold text-white mb-2">Leave a Review</h3>
              <p className="text-gray-400 mb-6">Share your experience working with me</p>
              
              {responseMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-md ${
                    status === 'error' 
                      ? 'bg-red-900/20 text-red-300' 
                      : 'bg-green-900/20 text-green-300'
                  }`}
                >
                  <div className="flex items-center">
                    {status === 'error' ? (
                      <XCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    )}
                    <span>{responseMessage}</span>
                  </div>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 input-field"
                    required
                    disabled={isSubmitting}
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 input-field"
                    disabled={isSubmitting}
                    placeholder="Company Name"
                  />
                </div>
                
                <div>
                  <span className="block text-sm font-medium text-gray-300 mb-2">
                    Rating <span className="text-red-500">*</span>
                  </span>
                  <div className="flex items-center space-x-2 bg-gray-700/30 p-2 rounded-xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className={`p-2 rounded-lg transition-all ${star <= formData.rating ? 'bg-indigo-600/30' : 'hover:bg-gray-600/50'}`}
                        disabled={isSubmitting}
                        aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                      >
                        <Star
                          className={`w-6 h-6 ${star <= formData.rating ? 'text-purple-400' : 'text-gray-500'}`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-300">
                      {formData.rating} {formData.rating === 1 ? 'star' : 'stars'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 input-field"
                    required
                    disabled={isSubmitting}
                    placeholder="Share your experience working with me..."
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center px-6 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-900/20"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Review
                      </>
                    )}
                  </motion.button>
                </div>
                
                <p className="text-xs text-center text-gray-400 mt-6">
                  Your review will be reviewed before being published to ensure a positive community experience.
                </p>
              </form>
            </div>
          </div>
          
          {/* Review Form - Moved to sidebar */}
        </div>
      </div>
    </section>
  );
}