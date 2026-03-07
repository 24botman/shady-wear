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
          {product.in_stock ? 'ADD TO BAG' : 'NOTIFY ME'}
        </button>
      </div>

      <style jsx="true">{`
        .product-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .product-card:hover {
          border-color: var(--color-red);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .product-card__image {
          position: relative;
          width: 100%;
          aspect-ratio: 4/5;
          overflow: hidden;
        }
        .product-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .product-card:hover .product-card__image img {
          transform: scale(1.1);
        }
        .product-card__badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: var(--color-black);
          color: var(--color-white);
          padding: 6px 12px;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          z-index: 2;
          text-transform: uppercase;
        }
        .badge--new {
          background: var(--color-red);
        }
        .product-card__content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .product-card__title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 8px;
          letter-spacing: 0.02em;
          color: var(--color-white);
        }
        .product-card__price {
          font-size: 1.1rem;
          color: var(--color-red);
          font-weight: 700;
          margin-bottom: 20px;
        }
        .product-card__sizes {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          margin-top: auto;
        }
        .size-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-gray-light);
          transition: all 0.2s ease;
        }
        .size-btn:hover:not(:disabled) {
          border-color: var(--color-white);
          color: var(--color-white);
        }
        .size-btn.active {
          background: var(--color-white);
          color: var(--color-black);
          border-color: var(--color-white);
        }
        .product-card__btn {
          width: 100%;
          padding: 14px;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          font-weight: 700;
        }
      `}</style>
    </motion.div>
  )
}
