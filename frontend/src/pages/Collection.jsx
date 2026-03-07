import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFilter, FiChevronDown, FiSearch } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../lib/api'
import './Collection.css'

const categories = ['T-Shirts', 'Hoodies', 'Pants', 'Jackets', 'Accessories']
const brands = ['Shady Records', 'H&M', 'US Polo Assn', 'Zara', 'Nike']
const priceRanges = [
    { label: 'Under ₹999', min: 0, max: 999 },
    { label: '₹1,000 - ₹2,999', min: 1000, max: 2999 },
    { label: '₹3,000 - ₹4,999', min: 3000, max: 4999 },
    { label: 'Over ₹5,000', min: 5000, max: 999999 }
]

export default function Collection() {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(true)

    // Filter State
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([])
    const [sortBy, setSortBy] = useState('newest')
    const [searchTerm, setSearchTerm] = useState('')

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProducts()
                setProducts(res.data)
                setFilteredProducts(res.data)
            } catch (err) {
                console.error("Failed to fetch products:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    // Apply Filters & Sorting
    useEffect(() => {
        let result = [...products]

        // Search Filter
        if (searchTerm) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Category Filter
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category))
        }

        // Brand Filter
        if (selectedBrands.length > 0) {
            result = result.filter(p => selectedBrands.includes(p.brand))
        }

        // Price Filter
        if (selectedPriceRanges.length > 0) {
            result = result.filter(p => {
                return selectedPriceRanges.some(range => {
                    const r = priceRanges.find(pr => pr.label === range)
                    return p.price >= r.min && p.price <= r.max
                })
            })
        }

        // Sorting
        if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price)
        if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price)
        if (sortBy === 'newest') result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

        setFilteredProducts(result)
    }, [products, selectedCategories, selectedPriceRanges, sortBy, searchTerm])

    const toggleCategory = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        )
    }

    const togglePriceRange = (label) => {
        setSelectedPriceRanges(prev =>
            prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
        )
    }

    const toggleBrand = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        )
    }

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
                </div>
            </section>

            <section className="section">
                <div className="container collection-container">
                    {/* Sidebar Filters */}
                    <aside className="collection-sidebar">
                        <div className="sidebar-section">
                            <h4 className="sidebar-title">Categories</h4>
                            <div className="filter-options">
                                {categories.map(cat => (
                                    <label key={cat} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => toggleCategory(cat)}
                                        />
                                        {cat}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h4 className="sidebar-title">Brands</h4>
                            <div className="filter-options">
                                {brands.map(brand => (
                                    <label key={brand} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => toggleBrand(brand)}
                                        />
                                        {brand}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h4 className="sidebar-title">Price Range</h4>
                            <div className="filter-options">
                                {priceRanges.map(range => (
                                    <label key={range.label} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedPriceRanges.includes(range.label)}
                                            onChange={() => togglePriceRange(range.label)}
                                        />
                                        {range.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <button className="btn btn-outline w-100" onClick={() => {
                                setSelectedCategories([])
                                setSelectedBrands([])
                                setSelectedPriceRanges([])
                                setSearchTerm('')
                            }}>
                                CLEAR FILTERS
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="collection-main">
                        <div className="collection-toolbar">
                            <div className="product-count">
                                <span>{filteredProducts.length}</span> Products Found
                            </div>

                            <div className="sort-container">
                                <div className="search-bar">
                                    <FiSearch />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="sort-select"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="loading-spinner">Loading products...</div>
                        ) : (
                            <motion.div className="product-grid" layout>
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
                        )}

                        {!loading && filteredProducts.length === 0 && (
                            <div className="collection-empty">
                                <p>No items found. Try adjusting your filters.</p>
                            </div>
                        )}
                    </main>
                </div>
            </section>
        </div>
    )
}
