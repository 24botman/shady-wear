import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import './index.css'

try {
    const rootElement = document.getElementById('root');
    if (!rootElement) throw new Error("Root element not found!");

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>
    )
} catch (error) {
    console.error("Critical Runtime Error:", error);
    document.getElementById('root').innerHTML = `
        <div style="background: #111; color: #ff5555; padding: 20px; font-family: monospace; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
            <h1 style="font-size: 2rem;">🚀 SYSTEM ERROR</h1>
            <p style="margin: 20px; color: #fff;">The website failed to load. Please check the error below:</p>
            <div style="background: #222; padding: 15px; border-radius: 5px; border: 1px solid #333; max-width: 80%; overflow: auto;">
                <code>${error.message}</code>
            </div>
            <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #fff; color: #000; border: none; cursor: pointer; font-weight: bold;">RETRY</button>
        </div>
    `;
}
