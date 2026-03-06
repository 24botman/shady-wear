import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
    const containerRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Framer motion parallax effects
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])

    useEffect(() => {
        // GSAP text reveal
        const splitTexts = gsap.utils.toArray('.reveal-text')

        splitTexts.forEach(text => {
            gsap.fromTo(text,
                { autoAlpha: 0, y: 50 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: text,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            )
        })
    }, [])

    return (
        <div className="about page-enter page-enter-active" ref={containerRef}>

            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero__bg"></div>
                <div className="container about-hero__content">
                    <motion.h1
                        className="section-title text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        OUR <span>STORY</span>
                    </motion.h1>
                    <motion.p
                        className="about-hero__lead text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        "You only get one shot, do not miss your chance to blow."
                    </motion.p>
                </div>
            </section>

            {/* The Origin */}
            <section className="section about-origin">
                <div className="container">
                    <div className="about-split">
                        <motion.div className="about-split__img" style={{ y: y1 }}>
                            <div className="img-wrap">
                                <img src="/images/OIP (1).jpeg" alt="Detroit 8 Mile" />
                                <div className="img-glow"></div>
                            </div>
                        </motion.div>
                        <div className="about-split__text">
                            <h2 className="section-title reveal-text">FROM THE <span>D</span></h2>
                            <p className="reveal-text">
                                Shady Wear isn't just a clothing brand. It's a testament to the grind, the struggle,
                                and the relentless pursuit of greatness. Born from the legacy of Marshall Mathers,
                                our designs draw inspiration from the gritty streets of Detroit, battle rap culture,
                                and the rebellious spirit of Slim Shady.
                            </p>
                            <p className="reveal-text">
                                Every stitch tells a story. Every graphic is a piece of hip-hop history. We refuse
                                to compromise on quality, sourcing premium materials that can withstand the test of time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="section about-philo">
                <div className="container">
                    <div className="about-split reverse">
                        <motion.div className="about-split__img" style={{ y: y2 }}>
                            <div className="img-wrap">
                                <img src="/images/th (6).jpeg" alt="Eminem Stage" />
                            </div>
                        </motion.div>
                        <div className="about-split__text">
                            <h2 className="section-title reveal-text">THE <span>PHILOSOPHY</span></h2>
                            <p className="reveal-text">
                                We believe in authentic expression. Our collections are designed for those who aren't
                                afraid to speak their minds and stand out from the crowd. We blend high-end streetwear
                                with edgy, subversive aesthetics.
                            </p>
                            <ul className="about-list">
                                <li className="reveal-text">
                                    <span className="dot"></span> <strong>Premium Quality:</strong> Heavyweight cotton, impeccable stitching.
                                </li>
                                <li className="reveal-text">
                                    <span className="dot"></span> <strong>Iconic Art:</strong> Designs approved by the label.
                                </li>
                                <li className="reveal-text">
                                    <span className="dot"></span> <strong>Limited Drops:</strong> Exclusivity meant for true fans.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
