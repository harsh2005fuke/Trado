import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import './BuyActionWindow.css'

function BuyActionWindow({ stock, onClose }) {
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(stock.price || stock.avg)
    const [mode, setMode] = useState('BUY')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await axios.post(`${API_URL}/newOrder`, {
                name: stock.name,
                qty: parseInt(quantity),
                price: parseFloat(price),
                mode: mode
            })

            setSuccess(true)
            setTimeout(() => {
                onClose()
            }, 1500)
        } catch (error) {
            console.error('Error placing order:', error)
            alert('Failed to place order. Please try again.')
            setLoading(false)
        }
    }

    const totalValue = quantity * price

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{stock.name}</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                {success ? (
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <h4>Order Placed Successfully!</h4>
                        <p>{mode} {quantity} shares at ₹{price}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mode-selector">
                            <button
                                type="button"
                                className={`mode-btn ${mode === 'BUY' ? 'active buy' : ''}`}
                                onClick={() => setMode('BUY')}
                            >
                                Buy
                            </button>
                            <button
                                type="button"
                                className={`mode-btn ${mode === 'SELL' ? 'active sell' : ''}`}
                                onClick={() => setMode('SELL')}
                            >
                                Sell
                            </button>
                        </div>

                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div className="order-summary">
                            <div className="summary-row">
                                <span>Total Value:</span>
                                <span className="total-value">₹{totalValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`submit-btn ${mode === 'BUY' ? 'btn-buy-order' : 'btn-sell-order'}`}
                            disabled={loading}
                        >
                            {loading ? 'Placing Order...' : `${mode} ${quantity} Share${quantity > 1 ? 's' : ''}`}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default BuyActionWindow
