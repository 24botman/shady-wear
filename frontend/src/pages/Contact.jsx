import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi'
import { sendContact } from '../lib/api'
import './Contact.css'

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('idle') // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        try {
            await sendContact(formData)
            setStatus('success')
            setFormData({ name: '', email: '', message: '' })
            setTimeout(() => setStatus('idle'), 5000)
        } catch (error) {
            console.error(error)
            setStatus('error')
        }
    }

    return (
        <div className="contact page-enter page-enter-active">
            <section className="contact-header">
                <div className="container">
                    <motion.h1
                        className="section-title text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        GET IN <span>TOUCH</span>
                    </motion.h1>
                    <motion.p
                        className="text-center section-subtitle" style={{ margin: '0 auto' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Have a question about an order, drop, or just want to say what's up?
                        Drop us a line below.
                    </motion.p>
                </div>
            </section>

            <section className="section contact-content">
                <div className="container contact-grid">

                    <motion.div
                        className="contact-info glass-card"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3>CONTACT <span>INFO</span></h3>
                        <div className="info-item">
                            <FiMapPin className="info-icon" />
                            <div>
                                <h4>HEADQUARTERS</h4>
                                <p>8 Mile Road<br />Detroit, MI 48205<br />United States</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <FiMail className="info-icon" />
                            <div>
                                <h4>EMAIL</h4>
                                <p>support@shadywear.com<br />collabs@shadywear.com</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <FiPhone className="info-icon" />
                            <div>
                                <h4>PHONE</h4>
                                <p>+1 (313) 555-0199<br />Mon-Fri, 9am - 5pm EST</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="contact-form-wrapper glass-card"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3>SEND A <span>MESSAGE</span></h3>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Stan..."
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="stan@example.com"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea
                                    className="form-input"
                                    required
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Dear Slim, I wrote you but you still ain't callin'..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary contact-submit"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
                            </button>

                            {status === 'success' && (
                                <p className="contact-msg success">Your message has been sent successfully!</p>
                            )}
                            {status === 'error' && (
                                <p className="contact-msg error">Failed to send message. Please try again.</p>
                            )}
                        </form>
                    </motion.div>

                </div>
            </section>
        </div>
    )
}
