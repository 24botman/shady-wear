import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import './Collection.css'

// Hardcoded initial data before backend integration
const allProducts = [
    { id: '1', name: 'Slim Shady Classic Hoodie', price: 89.99, image_url: '/images/1438079.jpg', category: 'Hoodies', sizes: ['S', 'M', 'L', 'XL'], in_stock: true, is_new: true },
    { id: '2', name: 'Detroit 313 Bomber Jacket', price: 149.99, image_url: '/images/1448061.jpg', category: 'Jackets', sizes: ['M', 'L', 'XL', 'XXL'], in_stock: true, is_new: false },
    { id: '3', name: 'Eminem Limited Tour Tee', price: 39.99, image_url: '/images/hmgoepprod.jpeg', category: 'T-Shirts', sizes: ['S', 'M', 'L'], in_stock: false, is_new: false },
    { id: '4', name: 'MTBMB Red Cap', price: 29.99, image_url: '/images/OIP.jpeg', category: 'Accessories', sizes: ['OS'], in_stock: true, is_new: true },
    { id: '5', name: 'Recovery Logo Tee', price: 34.99, image_url: '/images/OIP (7).jpeg', category: 'T-Shirts', sizes: ['S', 'M', 'L', 'XL'], in_stock: true, is_new: false },
    { id: '6', name: 'Rap God Beanie', price: 24.99, image_url: '/images/pop.jfif', category: 'Accessories', sizes: ['OS'], in_stock: true, is_new: false },
    { id: '7', name: 'Kamikaze Anorak', price: 119.99, image_url: '/images/t3.jfif', category: 'Jackets', sizes: ['M', 'L', 'XL'], in_stock: true, is_new: true },
    { id: '8', name: '8 Mile Classic Hoodie (Grey)', price: 84.99, image_url: '/images/th (11).jpeg', category: 'Hoodies', sizes: ['S', 'M', 'L', 'XL'], in_stock: true, is_new: false },
]

const categories = ['All', 'T-Shirts', 'Hoodies', 'Jackets', 'Accessories']

export default function Collection() {
    const [filter, setFilter] = useState('All')
    const [filteredProducts, setFilteredProducts] = useState(allProducts)

    useEffect(() => {
        if (filter === 'All') {
            setFilteredProducts(allProducts)
        } else {
            setFilteredProducts(allProducts.filter(p => p.category === filter))
        }
    }, [filter])

    return (
        <div className="collection page-enter page-enter-active">
            <section className="collection-header">
                <div className="container">
                    <motion.h1
                        className="section-title text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        THE <span>COLLECTION</span>
                    </motion.h1>

                    <motion.div
                        className="collection-filters"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="collection-grid section">
                <div className="container">
                    <motion.div
                        className="product-grid"
                        layout
                    >
                        <AnimatePresence>
                            {filteredProducts.map(product => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredProducts.length === 0 && (
                        <div className="collection-empty">
                            <h3>No products found in this category.</h3>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
