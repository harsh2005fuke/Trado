import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import './Orders.css'

function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/allOrders`)
            setOrders(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching orders:', error)
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading orders...</p>
            </div>
        )
    }

    return (
        <div className="orders fade-in">
            <h2 className="page-title">Orders ({orders.length})</h2>

            {orders.length === 0 ? (
                <div className="empty-state card">
                    <div className="empty-icon">📋</div>
                    <h3>No orders yet</h3>
                    <p>Your order history will appear here once you start trading</p>
                </div>
            ) : (
                <div className="table-container card">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Stock</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Mode</th>
                                <th>Date & Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td className="stock-name">{order.name}</td>
                                    <td>{order.qty}</td>
                                    <td>₹{order.price.toFixed(2)}</td>
                                    <td>
                                        <span className={`mode-badge ${order.mode === 'BUY' ? 'mode-buy' : 'mode-sell'}`}>
                                            {order.mode}
                                        </span>
                                    </td>
                                    <td>{new Date(order.createdAt).toLocaleString('en-IN')}</td>
                                    <td>
                                        <span className="status-badge status-completed">Completed</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Orders
