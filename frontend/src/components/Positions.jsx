import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import BuyActionWindow from './BuyActionWindow'
import './Positions.css'

function Positions() {
    const [positions, setPositions] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedStock, setSelectedStock] = useState(null)

    useEffect(() => {
        fetchPositions()
    }, [])

    const fetchPositions = async () => {
        try {
            const response = await axios.get(`${API_URL}/allPositions`)
            setPositions(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching positions:', error)
            setLoading(false)
        }
    }

    const handleBuyClick = (stock) => {
        setSelectedStock(stock)
    }

    const handleCloseModal = () => {
        setSelectedStock(null)
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading positions...</p>
            </div>
        )
    }

    const totalValue = positions.reduce((sum, p) => sum + (p.price * p.qty), 0)
    const totalInvestment = positions.reduce((sum, p) => sum + (p.avg * p.qty), 0)
    const totalPnL = totalValue - totalInvestment
    const totalPnLPercent = totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : 0

    return (
        <div className="positions fade-in">
            <div className="positions-header">
                <h2 className="page-title">Positions ({positions.length})</h2>
                <div className="positions-summary">
                    <div className="summary-item">
                        <span className="label">Total Value:</span>
                        <span className="value">₹{totalValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Total P&L:</span>
                        <span className={`value ${totalPnL >= 0 ? 'text-success' : 'text-danger'}`}>
                            {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString('en-IN', { maximumFractionDigits: 2 })} ({totalPnLPercent}%)
                        </span>
                    </div>
                </div>
            </div>

            <div className="table-container card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Stock</th>
                            <th>Qty</th>
                            <th>Avg Price</th>
                            <th>LTP</th>
                            <th>P&L</th>
                            <th>Day Change</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((position, index) => (
                            <tr key={index}>
                                <td>
                                    <span className="product-badge">{position.product}</span>
                                </td>
                                <td className="stock-name">{position.name}</td>
                                <td>{position.qty}</td>
                                <td>₹{position.avg.toFixed(2)}</td>
                                <td>₹{position.price.toFixed(2)}</td>
                                <td className={position.net.includes('+') ? 'text-success' : 'text-danger'}>
                                    {position.net}
                                </td>
                                <td className={position.day.includes('+') ? 'text-success' : 'text-danger'}>
                                    {position.day}
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn-action btn-buy" onClick={() => handleBuyClick(position)}>
                                            Buy
                                        </button>
                                        <button className="btn-action btn-sell" onClick={() => handleBuyClick(position)}>
                                            Sell
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedStock && (
                <BuyActionWindow stock={selectedStock} onClose={handleCloseModal} />
            )}
        </div>
    )
}

export default Positions
