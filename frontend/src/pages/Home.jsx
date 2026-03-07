import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '../components/ProductCard'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

// Dummy data for featured products
const featuredProducts = [
    {
        id: '1',
        name: 'Slim Shady Classic Hoodie',
        price: 3499,
        image_url: '/images/1438079.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        in_stock: true,
        is_new: true,
        brand: 'Shady Records'
    },
    {
        id: '2',
        name: 'Detroit 313 Bomber Jacket',
        price: 5999,
        image_url: '/images/1448061.jpg',
        sizes: ['M', 'L', 'XL', 'XXL'],
        in_stock: true,
        is_new: false,
        brand: 'Shady Records'
    },
    {
        id: '3',
        name: 'Eminem Limited Tour Tee',
        price: 1499,
        image_url: '/images/hmgoepprod.jpeg',
        sizes: ['S', 'M', 'L'],
        in_stock: false,
        is_new: false,
        brand: 'Shady Records'
    },
    {
        id: '4',
        name: 'MTBMB Red Cap',
        price: 999,
        image_url: '/images/OIP.jpeg',
        sizes: ['OS'],
        in_stock: true,
        is_new: true,
        brand: 'Shady Records'
    }
]

export default function Home() {
    const heroRef = useRef(null)
    const marqueeRef = useRef(null)

    useEffect(() => {
        // Parallax hero effect
        gsap.to('.home-hero__bg', {
            yPercent: 40,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })

        // Marquee animation
        gsap.to('.marquee__inner', {
            xPercent: -50,
            ease: 'none',
            duration: 20,
            repeat: -1,
        })
    }, [])

    return (
        <div className="home page-enter page-enter-active">
            {/* Hero Section */}
            <section className="home-hero" ref={heroRef}>
                <div
                    className="home-hero__bg"
                    style={{ backgroundImage: 'url(/images/1438079.jpg)' }}
                ></div>
                <div className="home-hero__overlay"></div>
                <div className="container home-hero__content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="home-hero__subtitle">THE OFFICIAL STORE</h2>
                        <h1 className="home-hero__title">
                            SLIM <span className="text-gradient">SHADY</span> RECORDs
                        </h1>
                        <p className="home-hero__desc">
                            Exclusive drops, classic merch, and premium streetwear.
                            Straight from the D.
                        </p>
                        <div className="home-hero__actions">
                            <Link to="/collection" className="btn btn-primary">
                                SHOP THE COLLECTION
                            </Link>
                            <Link to="/about" className="btn btn-outline">
                                EXPLORE HISTORY
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Marquee */}
            <div className="marquee" ref={marqueeRef}>
                <div className="marquee__inner">
                    <span>MARSHALL MATHERS</span>
                    <span>•</span>
                    <span>SLIM SHADY</span>
                    <span>•</span>
                    <span>EMINEM</span>
                    <span>•</span>
                    <span>DETROIT</span>
                    <span>•</span>
                    <span>MARSHALL MATHERS</span>
                    <span>•</span>
                    <span>SLIM SHADY</span>
                    <span>•</span>
                    <span>EMINEM</span>
                    <span>•</span>
                    <span>DETROIT</span>
                </div>
            </div>

            {/* Featured Collection */}
            <section className="section home-featured">
                <div className="container">
                    <div className="home-featured__header">
                        <div>
                            <h2 className="section-title animate-fadeInUp">
                                LATEST <span>DROPS</span>
                            </h2>
                            <p className="section-subtitle animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                                Secure the newest exclusive gear before it sells out.
                            </p>
                        </div>
                        <Link to="/collection" className="btn btn-outline">
                            VIEW ALL
                        </Link>
                    </div>

                    <div className="home-featured__grid">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Split CTA Section */}
            <section className="home-cta">
                <div className="home-cta__split">
                    <div className="home-cta__img-wrap">
                        <img src="/images/1448061.jpg" alt="Eminem Style" className="home-cta__img" />
                    </div>
                    <div className="home-cta__content">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="section-title">
                                THE <span>LEGACY</span> LIVES ON
                            </h2>
                            <p className="home-cta__desc">
                                From the gritty streets of Detroit to global domination.
                                Our premium collection encapsulates the attitude, the struggle,
                                and the triumph of an icon. Wear the legacy.
                            </p>
                            <Link to="/about" className="btn btn-primary">
                                READ THE STORY
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section home-newsletter">
                <div className="container">
                    <motion.div
                        className="home-newsletter__box glass-card animate-glow"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2>JOIN THE VIP LIST</h2>
                        <p>Get early access to exclusive drops and insider updates.</p>
                        <form className="home-newsletter__form" onSubmit={e => e.preventDefault()}>
                            <input type="email" placeholder="Enter your email" className="form-input" />
                            <button className="btn btn-primary">SUBSCRIBE</button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
