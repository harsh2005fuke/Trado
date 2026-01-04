import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import './Summary.css'

function Summary() {
    const [holdings, setHoldings] = useState([])
    const [positions, setPositions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [holdingsRes, positionsRes] = await Promise.all([
                axios.get(`${API_URL}/allHoldings`),
                axios.get(`${API_URL}/allPositions`)
            ])
            setHoldings(holdingsRes.data)
            setPositions(positionsRes.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error)
            setLoading(false)
        }
    }

    const calculateTotalValue = (items) => {
        return items.reduce((total, item) => total + (item.price * item.qty), 0)
    }

    const calculateTotalInvestment = (items) => {
        return items.reduce((total, item) => total + (item.avg * item.qty), 0)
    }

    const totalHoldingsValue = calculateTotalValue(holdings)
    const totalHoldingsInvestment = calculateTotalInvestment(holdings)
    const totalHoldingsPnL = totalHoldingsValue - totalHoldingsInvestment
    const totalHoldingsPnLPercent = ((totalHoldingsPnL / totalHoldingsInvestment) * 100).toFixed(2)

    const totalPositionsValue = calculateTotalValue(positions)
    const totalPositionsInvestment = calculateTotalInvestment(positions)
    const totalPositionsPnL = totalPositionsValue - totalPositionsInvestment
    const totalPositionsPnLPercent = ((totalPositionsPnL / totalPositionsInvestment) * 100).toFixed(2)

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        )
    }

    return (
        <div className="summary fade-in">
            <h2 className="page-title">Dashboard Overview</h2>

            <div className="summary-grid">
                <div className="summary-card card">
                    <div className="card-icon">📊</div>
                    <div className="card-content">
                        <h3>Total Holdings</h3>
                        <div className="value">₹{totalHoldingsValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
                        <div className={`change ${totalHoldingsPnL >= 0 ? 'text-success' : 'text-danger'}`}>
                            {totalHoldingsPnL >= 0 ? '+' : ''}₹{totalHoldingsPnL.toLocaleString('en-IN', { maximumFractionDigits: 2 })} ({totalHoldingsPnLPercent}%)
                        </div>
                    </div>
                </div>

                <div className="summary-card card">
                    <div className="card-icon">💼</div>
                    <div className="card-content">
                        <h3>Total Positions</h3>
                        <div className="value">₹{totalPositionsValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
                        <div className={`change ${totalPositionsPnL >= 0 ? 'text-success' : 'text-danger'}`}>
                            {totalPositionsPnL >= 0 ? '+' : ''}₹{totalPositionsPnL.toLocaleString('en-IN', { maximumFractionDigits: 2 })} ({totalPositionsPnLPercent}%)
                        </div>
                    </div>
                </div>

                <div className="summary-card card">
                    <div className="card-icon">💰</div>
                    <div className="card-content">
                        <h3>Available Margin</h3>
                        <div className="value">₹50,000.00</div>
                        <div className="change text-muted">Ready to trade</div>
                    </div>
                </div>

                <div className="summary-card card">
                    <div className="card-icon">📈</div>
                    <div className="card-content">
                        <h3>Total P&L</h3>
                        <div className="value">₹{(totalHoldingsPnL + totalPositionsPnL).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
                        <div className={`change ${(totalHoldingsPnL + totalPositionsPnL) >= 0 ? 'text-success' : 'text-danger'}`}>
                            {(totalHoldingsPnL + totalPositionsPnL) >= 0 ? 'Profit' : 'Loss'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="recent-section">
                <h3>Recent Holdings</h3>
                <div className="table-container card">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Stock</th>
                                <th>Qty</th>
                                <th>Avg Price</th>
                                <th>LTP</th>
                                <th>P&L</th>
                            </tr>
                        </thead>
                        <tbody>
                            {holdings.slice(0, 5).map((holding, index) => (
                                <tr key={index}>
                                    <td className="stock-name">{holding.name}</td>
                                    <td>{holding.qty}</td>
                                    <td>₹{holding.avg.toFixed(2)}</td>
                                    <td>₹{holding.price.toFixed(2)}</td>
                                    <td className={holding.net.includes('+') ? 'text-success' : 'text-danger'}>
                                        {holding.net}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Summary
