import { useState } from 'react'
import './WatchList.css'

const watchlistData = [
    { symbol: 'NIFTY 50', price: '19,435.30', change: '+124.50', changePercent: '+0.65%', isPositive: true },
    { symbol: 'SENSEX', price: '65,280.45', change: '+245.80', changePercent: '+0.38%', isPositive: true },
    { symbol: 'RELIANCE', price: '2,112.40', change: '+30.15', changePercent: '+1.44%', isPositive: true },
    { symbol: 'TCS', price: '3,194.80', change: '-8.05', changePercent: '-0.25%', isPositive: false },
    { symbol: 'INFY', price: '1,555.45', change: '-25.30', changePercent: '-1.60%', isPositive: false },
    { symbol: 'HDFCBANK', price: '1,522.35', change: '+1.65', changePercent: '+0.11%', isPositive: true },
    { symbol: 'ICICIBANK', price: '945.20', change: '+12.40', changePercent: '+1.33%', isPositive: true },
    { symbol: 'SBIN', price: '430.20', change: '-1.45', changePercent: '-0.34%', isPositive: false },
    { symbol: 'BHARTIARTL', price: '541.15', change: '+15.90', changePercent: '+2.99%', isPositive: true },
    { symbol: 'ITC', price: '207.90', change: '+1.65', changePercent: '+0.80%', isPositive: true },
]

function WatchList() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredWatchlist = watchlistData.filter(stock =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="watchlist">
            <div className="watchlist-header">
                <h3>Watchlist</h3>
                <button className="add-btn" title="Add to watchlist">+</button>
            </div>

            <div className="watchlist-search">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="watchlist-items">
                {filteredWatchlist.map((stock, index) => (
                    <div key={index} className="watchlist-item">
                        <div className="stock-info">
                            <div className="stock-symbol">{stock.symbol}</div>
                            <div className={`stock-change ${stock.isPositive ? 'positive' : 'negative'}`}>
                                {stock.changePercent}
                            </div>
                        </div>
                        <div className="stock-price-info">
                            <div className="stock-price">{stock.price}</div>
                            <div className={`stock-change-value ${stock.isPositive ? 'positive' : 'negative'}`}>
                                {stock.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WatchList
