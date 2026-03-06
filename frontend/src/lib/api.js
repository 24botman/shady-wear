import axios from 'axios'
import { supabase } from './supabase'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Attach auth token to every request
api.interceptors.request.use(async (config) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`
    }
    return config
})

// Products
export const getProducts = () => api.get('/api/products')
export const getProduct = (id) => api.get(`/api/products/${id}`)

// Orders
export const createOrder = (orderData) => api.post('/api/orders', orderData)
export const getOrders = () => api.get('/api/orders')

// Reviews
export const getReviews = () => api.get('/api/reviews')
export const createReview = (reviewData) => api.post('/api/reviews', reviewData)

// Contact
export const sendContact = (contactData) => api.post('/api/contact', contactData)

export default api
