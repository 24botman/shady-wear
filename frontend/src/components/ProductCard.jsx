import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
    const [selectedSize, setSelectedSize] = useState(product.sizes[0])
    const { addItem } = useCart()

    return (
        <motion.div
            className="product-card glass-card"
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
        >
            <div className="product-card__image">
                <img src={product.image_url} alt={product.name} loading="lazy" />
                {!product.in_stock && <div className="product-card__badge">OUT OF STOCK</div>}
                {product.is_new && <div className="product-card__badge badge--new">NEW DROP</div>}
            </div>

            <div className="product-card__content">
                <h3 className="product-card__title">{product.name}</h3>
                <p className="product-card__price">${product.price.toFixed(2)}</p>

                <div className="product-card__sizes">
                    {product.sizes.map((size) => (
                        <button
                            key={size}
                            className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>

                <button
                    className="btn btn-primary product-card__btn"
                    disabled={!product.in_stock}
                    onClick={() => addItem(product, selectedSize)}
                >
                    {product.in_stock ? 'ADD TO CART' : 'SOLD OUT'}
                </button>
            </div>

            <style jsx="true">{`
        .product-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .product-card__image {
          position: relative;
          width: 100%;
          aspect-ratio: 4/5;
          overflow: hidden;
          background: var(--color-dark-2);
        }
        .product-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
        }
        .product-card:hover .product-card__image img {
          transform: scale(1.08);
        }
        .product-card__badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--color-black);
          color: var(--color-white);
          padding: 4px 10px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          z-index: 2;
        }
        .badge--new {
          background: var(--color-red);
        }
        .product-card__content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .product-card__title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .product-card__price {
          font-size: 1rem;
          color: var(--color-red);
          font-weight: 600;
          margin-bottom: 16px;
        }
        .product-card__sizes {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          margin-top: auto;
        }
        .size-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--color-gray);
          font-size: 0.8rem;
          font-family: var(--font-body);
          color: var(--color-gray-light);
          transition: all var(--transition-fast);
        }
        .size-btn:hover {
          color: var(--color-white);
          border-color: var(--color-white);
        }
        .size-btn.active {
          background: var(--color-white);
          color: var(--color-black);
          border-color: var(--color-white);
        }
        .product-card__btn {
          width: 100%;
          padding: 12px;
          font-size: 0.9rem;
        }
        .product-card__btn:disabled {
          background: var(--color-gray);
          color: var(--color-gray-light);
          cursor: not-allowed;
          box-shadow: none;
        }
      `}</style>
        </motion.div>
    )
}
