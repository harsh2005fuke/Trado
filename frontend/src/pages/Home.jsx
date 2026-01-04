import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className="home">
            <nav className="navbar">
                <div className="container navbar-content">
                    <div className="logo">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <rect width="40" height="40" rx="8" fill="#387ed1" />
                            <path d="M12 28L20 12L28 28H24L20 20L16 28H12Z" fill="white" />
                        </svg>
                        <span className="logo-text">Trado</span>
                    </div>
                    <div className="nav-links">
                        <Link to="/dashboard" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </nav>

            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Invest in everything
                        </h1>
                        <p className="hero-subtitle">
                            Online platform to invest in stocks, derivatives, mutual funds, and more
                        </p>
                        <Link to="/dashboard" className="btn btn-primary btn-large">
                            Open Dashboard
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                            </svg>
                        </Link>
                    </div>
                    <div className="hero-image">
                        <div className="trading-card">
                            <div className="card-header">
                                <span className="stock-symbol">NIFTY 50</span>
                                <span className="stock-price text-success">+1.24%</span>
                            </div>
                            <div className="chart-placeholder">
                                <svg viewBox="0 0 300 150" className="mini-chart">
                                    <polyline
                                        points="0,100 30,90 60,95 90,70 120,75 150,50 180,60 210,40 240,45 270,30 300,35"
                                        fill="none"
                                        stroke="var(--success-green)"
                                        strokeWidth="2"
                                    />
                                    <polyline
                                        points="0,100 30,90 60,95 90,70 120,75 150,50 180,60 210,40 240,45 270,30 300,35"
                                        fill="url(#gradient)"
                                        opacity="0.2"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="var(--success-green)" />
                                            <stop offset="100%" stopColor="transparent" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2 className="section-title">Why choose us?</h2>
                    <div className="features-grid">
                        <div className="feature-card card">
                            <div className="feature-icon">📊</div>
                            <h3>Advanced Charts</h3>
                            <p>Professional trading tools with real-time data visualization</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">⚡</div>
                            <h3>Lightning Fast</h3>
                            <p>Execute trades in milliseconds with our optimized platform</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure</h3>
                            <p>Bank-grade security to keep your investments safe</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">💰</div>
                            <h3>Zero Commission</h3>
                            <p>Trade stocks and ETFs without paying any commission</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <p>&copy; Trado. Built with MERN Stack.</p>
                </div>
            </footer>
        </div>
    )
}

export default Home
