'use client'

import { motion } from 'framer-motion'
import { Star, Send, User, AlertCircle, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import LoadingAnimation from './LoadingAnimation'

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  company?: string
  date: string
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
    company: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [responseMessage, setResponseMessage] = useState('')
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews')
      const data = await response.json()
      setReviews(data.reviews || [])
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setShowLoading(true)
    setResponseMessage('')

    try {
      // Show loading animation for at least 1 second
      const [response] = await Promise.all([
        fetch('/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            rating: Number(formData.rating),
            comment: formData.comment.trim(),
            company: formData.company.trim()
          }),
        }),
        new Promise(resolve => setTimeout(resolve, 1000))
      ])

      const data = await response.json()
      setShowLoading(false)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review')
      }

      if (data.success) {
        setStatus('success')
        setResponseMessage(data.message || 'Thank you for your review!')
        setFormData({ name: '', rating: 5, comment: '', company: '' })
        // Refresh reviews after a short delay
        setTimeout(() => {
          fetchReviews()
        }, 500)
      } else {
        throw new Error(data.error || 'Failed to submit review')
      }
    } catch (error) {
      console.error('Review submission error:', error)
      setShowLoading(false)
      setStatus('error')
      setResponseMessage(error instanceof Error ? error.message : 'Failed to submit review. Please try again.')
      
      // Auto-clear the error message after 5 seconds
      const timer = setTimeout(() => {
        setStatus('idle')
        setResponseMessage('')
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'} transition-colors`}
            aria-hidden="true"
          />
        ))}
      </div>
    )
  }

  return (
    <>
      {showLoading && <LoadingAnimation />}
      <section id="reviews" className="py-20 px-6 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Reviews</h2>
            <p className="text-white/60 text-lg">What our clients say about us</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Reviews Display */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">Recent Reviews</h3>
              {reviews.length === 0 ? (
                <div className="glass rounded-3xl p-8 text-center text-white/60">
                  <p>No reviews yet. Be the first to leave a review!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="glass rounded-2xl p-6 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="glass p-3 rounded-full">
                          <User size={24} className="text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.name}</h4>
                              {review.company && (
                                <p className="text-sm text-white/60">{review.company}</p>
                              )}
                            </div>
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-white/80 mb-2">{review.comment}</p>
                          <p className="text-xs text-white/40">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Review Submission Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Leave a Review</h3>
              <form onSubmit={handleSubmit} className="glass rounded-3xl p-8">
                <div className="mb-6">
                  <label htmlFor="review-name" className="block text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="review-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="Your Company"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="rating" className="block text-sm font-medium mb-2">
                    Rating *
                  </label>
                  <div className="flex items-center gap-2" role="radiogroup" aria-label="Rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        role="radio"
                        aria-checked={star === formData.rating}
                        aria-label={`${star} star${star === 1 ? '' : 's'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded-full p-1"
                      >
                        <Star
                          size={28}
                          className={`transition-colors ${star <= formData.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-400 hover:text-yellow-300'}`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="review-comment" className="block text-sm font-medium mb-2">
                    Your Review *
                  </label>
                  <textarea
                    id="review-comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                    placeholder="Share your experience with Devera..."
                  />
                </div>

                {responseMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                      status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {status === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span>{responseMessage}</span>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full gradient-border px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Review <Send size={20} />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
      </div>
    </section>
    </>
  )
}
