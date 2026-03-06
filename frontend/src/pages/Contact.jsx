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
            const res = await sendContact(formData)
            if (res.status === 200 || res.status === 201) {
                setStatus('success')
                setFormData({ name: '', email: '', message: '' })
                setTimeout(() => setStatus('idle'), 5000)
            } else {
                throw new Error("Failed to send")
            }
        } catch (error) {
            console.error("Contact form error:", error)
            const serverMsg = error.response?.data?.detail || error.message
            alert(`⚠️ Error: ${serverMsg}`)
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
                                <h4>LOCATION</h4>
                                <p>Nelson road<br />Thiruanaikovil<br />Tiruchirappalli-620006</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <FiMail className="info-icon" />
                            <div>
                                <h4>EMAIL</h4>
                                <p>Eminem@gmail.com<br />shadywear@gmail.com</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <FiPhone className="info-icon" />
                            <div>
                                <h4>PHONE</h4>
                                <p>+91 987654321<br />Mon-Fri, 9am - 5pm EST</p>
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

            <section className="contact-map section">
                <div className="container">
                    <div className="glass-card" style={{ padding: '0', overflow: 'hidden', height: '400px', border: '1px solid var(--accent-red-alpha)' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.472851978255!2d78.705624!3d10.851605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf567b5e40639%3A0xc6cb5a6109e25c04!2sNelson%20Rd%2C%20Tiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709730000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Eminem Clothing Location"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    )
}
