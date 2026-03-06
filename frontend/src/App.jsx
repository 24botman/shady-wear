import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Review from './pages/Review'

function App() {
    const location = useLocation()

    return (
        <>
            <Navbar />
            <CartDrawer />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/reviews" element={<Review />} />
                </Routes>
            </AnimatePresence>
            <Footer />
        </>
    )
}

export default App
