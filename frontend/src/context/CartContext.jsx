import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext({})

export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {
    const [items, setItems] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const addItem = useCallback((product, size = 'M', quantity = 1) => {
        setItems(prev => {
            const existingIndex = prev.findIndex(
                item => item.id === product.id && item.size === size
            )
            if (existingIndex >= 0) {
                const updated = [...prev]
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity,
                }
                return updated
            }
            return [...prev, { ...product, size, quantity }]
        })
        setIsOpen(true)
    }, [])

    const removeItem = useCallback((productId, size) => {
        setItems(prev => prev.filter(item => !(item.id === productId && item.size === size)))
    }, [])

    const updateQuantity = useCallback((productId, size, quantity) => {
        if (quantity <= 0) {
            removeItem(productId, size)
            return
        }
        setItems(prev =>
            prev.map(item =>
                item.id === productId && item.size === size
                    ? { ...item, quantity }
                    : item
            )
        )
    }, [removeItem])

    const clearCart = useCallback(() => setItems([]), [])

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                setIsOpen,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
