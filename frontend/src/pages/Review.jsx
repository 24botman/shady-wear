import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { getReviews, createReview } from '../lib/api'
import './Review.css'

// Hardcoded initial data before backend integration
const initialReviews = [
    { id: '1', user_name: 'Stan M.', rating: 5, comment: 'The hoodie quality is insane. Heavyweight cotton just like the vintage merch. Still a fan.' },
    { id: '2', user_name: 'Marshall Fan 99', rating: 4, comment: 'Dope designs. Fast shipping. Only gave 4 stars because my size was sold out in the bomber jacket.' },
    { id: '3', user_name: 'Detroit Native', rating: 5, comment: 'Representing the 313. This gear is authentic. You can feel the quality.' },
]

export default function Review() {
    const { user, signInWithGoogle } = useAuth()
    const [reviews, setReviews] = useState(initialReviews)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [submitting, setSubmitting] = useState(false)

    // In real app, fetch reviews on mount
    // useEffect(() => { getReviews().then(res => setReviews(res.data)) }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!comment.trim()) return

        setSubmitting(true)
        try {
            // Mock API call for now
            // await createReview({ rating, comment })
            const newReview = {
                id: Date.now().toString(),
                user_name: user?.user_metadata?.full_name || 'Anonymous',
                rating,
                comment
            }
            setReviews([newReview, ...reviews])
            setComment('')
            setRating(5)
        } catch (err) {
            console.error(err)
            alert("Failed to post review")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="review page-enter page-enter-active">
            <section className="review-header">
                <div className="container">
                    <motion.h1
                        className="section-title text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        CUSTOMER <span>REVIEWS</span>
                    </motion.h1>
                    <motion.p
                        className="text-center section-subtitle" style={{ margin: '0 auto' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Real feedback from the Slim Shady community.
                    </motion.p>
                </div>
            </section>

            <section className="section review-content">
                <div className="container review-grid">

                    <motion.div
                        className="review-list"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <AnimatePresence>
                            {reviews.map((rev) => (
                                <motion.div
                                    key={rev.id}
                                    className="review-card glass-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    layout
                                >
                                    <div className="review-card__header">
                                        <div className="review-card__author">
                                            <div className="review-card__avatar">
                                                {rev.user_name.charAt(0).toUpperCase()}
                                            </div>
                                            <h4>{rev.user_name}</h4>
                                        </div>
                                        <div className="stars">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <span key={star} className={`star ${star > rev.rating ? 'empty' : ''}`}>★</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="review-card__comment">"{rev.comment}"</p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        className="review-form-wrapper glass-card"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3>LEAVE A <span>REVIEW</span></h3>

                        {!user ? (
                            <div className="review-login-prompt">
                                <p>You must be signed in to leave a review.</p>
                                <button className="btn btn-primary" onClick={signInWithGoogle}>
                                    SIGN IN WITH GOOGLE
                                </button>
                            </div>
                        ) : (
                            <form className="review-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Rating</label>
                                    <div className="review-rating-select">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                type="button"
                                                className={`star-btn ${star <= rating ? 'active' : ''}`}
                                                onClick={() => setRating(star)}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Share your thoughts</label>
                                    <textarea
                                        className="form-input"
                                        required
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        placeholder="How was the fit, quality, and delivery?"
                                        rows="4"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary review-submit"
                                    disabled={submitting}
                                >
                                    {submitting ? 'POSTING...' : 'POST REVIEW'}
                                </button>
                            </form>
                        )}
                    </motion.div>

                </div>
            </section>
        </div>
    )
}
