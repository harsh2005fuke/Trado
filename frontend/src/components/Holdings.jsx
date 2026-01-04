import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import BuyActionWindow from './BuyActionWindow'
import './Holdings.css'

function Holdings() {
    const [holdings, setHoldings] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedStock, setSelectedStock] = useState(null)

    useEffect(() => {
        fetchHoldings()
    }, [])

    const fetchHoldings = async () => {
        try {
            const response = await axios.get(`${API_URL}/allHoldings`)
            setHoldings(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching holdings:', error)
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
                <p>Loading holdings...</p>
            </div>
        )
    }

    const totalValue = holdings.reduce((sum, h) => sum + (h.price * h.qty), 0)
    const totalInvestment = holdings.reduce((sum, h) => sum + (h.avg * h.qty), 0)
    const totalPnL = totalValue - totalInvestment
    const totalPnLPercent = ((totalPnL / totalInvestment) * 100).toFixed(2)

    return (
        <div className="holdings fade-in">
            <div className="holdings-header">
                <h2 className="page-title">Holdings ({holdings.length})</h2>
                <div className="holdings-summary">
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
                            <th>Stock</th>
                            <th>Qty</th>
                            <th>Avg Price</th>
                            <th>LTP</th>
                            <th>Current Value</th>
                            <th>P&L</th>
                            <th>Day Change</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holdings.map((holding, index) => {
                            const currentValue = holding.price * holding.qty
                            const investment = holding.avg * holding.qty
                            const pnl = currentValue - investment

                            return (
                                <tr key={index}>
                                    <td className="stock-name">{holding.name}</td>
                                    <td>{holding.qty}</td>
                                    <td>₹{holding.avg.toFixed(2)}</td>
                                    <td>₹{holding.price.toFixed(2)}</td>
                                    <td>₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                    <td className={holding.net.includes('+') ? 'text-success' : 'text-danger'}>
                                        {holding.net}
                                    </td>
                                    <td className={holding.day.includes('+') ? 'text-success' : 'text-danger'}>
                                        {holding.day}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-action btn-buy" onClick={() => handleBuyClick(holding)}>
                                                Buy
                                            </button>
                                            <button className="btn-action btn-sell" onClick={() => handleBuyClick(holding)}>
                                                Sell
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {selectedStock && (
                <BuyActionWindow stock={selectedStock} onClose={handleCloseModal} />
            )}
        </div>
    )
}

export default Holdings
