import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiYoutube, FiMail } from 'react-icons/fi'
import { FaSpotify } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__glow"></div>
            <div className="container">
                <div className="footer__grid">
                    {/* Brand */}
                    <div className="footer__brand">
                        <h3 className="footer__logo">
                            🔥 SHADY<span>WEAR</span>
                        </h3>
                        <p className="footer__tagline">
                            Official Eminem Clothing. Premium streetwear inspired by the one and only Slim Shady.
                            Wear the legacy.
                        </p>
                        <div className="footer__socials">
                            <a href="#" className="footer__social-link" aria-label="Instagram">
                                <FiInstagram />
                            </a>
                            <a href="#" className="footer__social-link" aria-label="Twitter">
                                <FiTwitter />
                            </a>
                            <a href="#" className="footer__social-link" aria-label="YouTube">
                                <FiYoutube />
                            </a>
                            <a href="#" className="footer__social-link" aria-label="Spotify">
                                <FaSpotify />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Quick Links</h4>
                        <ul className="footer__list">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/collection">Collection</Link></li>
                            <li><Link to="/reviews">Reviews</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Support</h4>
                        <ul className="footer__list">
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><a href="#">Shipping Info</a></li>
                            <li><a href="#">Returns & Exchange</a></li>
                            <li><a href="#">Size Guide</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Stay Updated</h4>
                        <p className="footer__newsletter-text">
                            Get exclusive drops and limited editions straight to your inbox.
                        </p>
                        <form className="footer__newsletter" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="footer__newsletter-input"
                            />
                            <button type="submit" className="footer__newsletter-btn">
                                <FiMail />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>&copy; 2026 SHADY WEAR. All rights reserved.</p>
                    <p>
                        Designed with 🔥 for the <span className="text-gradient">Slim Shady</span> community
                    </p>
                </div>
            </div>
        </footer>
    )
}
