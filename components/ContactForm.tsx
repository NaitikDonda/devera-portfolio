'use client'

import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import LoadingAnimation from './LoadingAnimation'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [responseMessage, setResponseMessage] = useState('')
  const [showLoading, setShowLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setShowLoading(true)

    try {
      // Show loading animation for at least 1 second
      const [response] = await Promise.all([
        fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }),
        new Promise(resolve => setTimeout(resolve, 1000))
      ])

      const data = await response.json()
      setShowLoading(false)

      if (response.ok) {
        setStatus('success')
        setResponseMessage(data.message)
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setResponseMessage(data.error || 'Something went wrong')
      }
    } catch (error) {
      setShowLoading(false)
      setStatus('error')
      setResponseMessage('Failed to send message. Please try again.')
    }

    setTimeout(() => {
      setStatus('idle')
      setResponseMessage('')
    }, 5000)
  }

  return (
    <>
      {showLoading && <LoadingAnimation />}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-white/60 text-lg">Let's discuss your next project</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
              placeholder="Tell us about your project..."
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
                Sending...
              </>
            ) : (
              <>
                Send Message <Send size={20} />
              </>
            )}
          </motion.button>
        </motion.form>
        </div>
      </section>
    </>
  )
}
