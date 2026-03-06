import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingBag, FiMenu, FiX, FiUser } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Navbar.css'

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/collection', label: 'Collection' },
    { path: '/contact', label: 'Contact' },
    { path: '/reviews', label: 'Reviews' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const { user, signInWithGoogle, signOut } = useAuth()
    const { totalItems, setIsOpen } = useCart()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
    }, [location])

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
            <div className="navbar__container container">
                {/* Logo */}
                <Link to="/" className="navbar__logo">
                    <span className="navbar__logo-icon">🔥</span>
                    <span className="navbar__logo-text">
                        SHADY<span>WEAR</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <ul className="navbar__links">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                                }
                            >
                                {link.label}
                                <span className="navbar__link-underline"></span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="navbar__actions">
                    {user ? (
                        <div className="navbar__user">
                            <img
                                src={user.user_metadata?.avatar_url || ''}
                                alt=""
                                className="navbar__avatar"
                            />
                            <button onClick={signOut} className="navbar__signout">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button onClick={signInWithGoogle} className="btn btn-glass navbar__login-btn">
                            <FiUser /> Sign In
                        </button>
                    )}

                    <button
                        className="navbar__cart-btn"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open cart"
                    >
                        <FiShoppingBag size={20} />
                        {totalItems > 0 && (
                            <motion.span
                                className="navbar__cart-badge"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                key={totalItems}
                            >
                                {totalItems}
                            </motion.span>
                        )}
                    </button>

                    <button
                        className="navbar__mobile-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="navbar__mobile"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="navbar__mobile-links">
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
