import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../lib/api'
import { useState } from 'react'
import './CartDrawer.css'

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
    const { user, signInWithGoogle } = useAuth()
    const [ordering, setOrdering] = useState(false)

    const handleCheckout = async () => {
        if (!user) {
            signInWithGoogle()
            return
        }
        setOrdering(true)
        try {
            await createOrder({
                items: items.map(item => ({
                    product_id: item.id,
                    name: item.name,
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total: totalPrice,
            })
            clearCart()
            alert('🎉 Order placed successfully!')
        } catch (err) {
            alert('Order failed. Please try again.')
            console.error(err)
        } finally {
            setOrdering(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="cart-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        className="cart-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    >
                        <div className="cart-drawer__header">
                            <h3>
                                <FiShoppingBag /> Your Cart
                            </h3>
                            <button onClick={() => setIsOpen(false)} className="cart-drawer__close">
                                <FiX size={22} />
                            </button>
                        </div>

                        {items.length === 0 ? (
                            <div className="cart-drawer__empty">
                                <FiShoppingBag size={48} />
                                <p>Your cart is empty</p>
                                <button className="btn btn-outline" onClick={() => setIsOpen(false)}>
                                    Shop Now
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="cart-drawer__items">
                                    {items.map((item) => (
                                        <motion.div
                                            key={`${item.id}-${item.size}`}
                                            className="cart-item"
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                        >
                                            <div className="cart-item__image">
                                                <img src={item.image_url} alt={item.name} />
                                            </div>
                                            <div className="cart-item__details">
                                                <h4>{item.name}</h4>
                                                <p className="cart-item__size">Size: {item.size}</p>
                                                <p className="cart-item__price">${item.price.toFixed(2)}</p>
                                                <div className="cart-item__qty">
                                                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>
                                                        <FiMinus />
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>
                                                        <FiPlus />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                className="cart-item__remove"
                                                onClick={() => removeItem(item.id, item.size)}
                                            >
                                                <FiX />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="cart-drawer__footer">
                                    <div className="cart-drawer__total">
                                        <span>Total</span>
                                        <span className="cart-drawer__total-price">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <button
                                        className="btn btn-primary cart-drawer__checkout"
                                        onClick={handleCheckout}
                                        disabled={ordering}
                                    >
                                        {ordering ? 'Processing...' : user ? 'Place Order' : 'Sign In to Order'}
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
