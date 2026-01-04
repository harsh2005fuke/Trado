import { Link } from 'react-router-dom'
import './TopBar.css'

function TopBar() {
    return (
        <nav className="topbar">
            <div className="topbar-content">
                <div className="topbar-left">
                    <Link to="/" className="topbar-logo">
                        <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                            <rect width="40" height="40" rx="8" fill="#387ed1" />
                            <path d="M12 28L20 12L28 28H24L20 20L16 28H12Z" fill="white" />
                        </svg>
                        <span>Trado</span>
                    </Link>
                </div>

                <div className="topbar-center">
                    <div className="search-box">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                        <input type="text" placeholder="Search stocks, ETFs..." />
                    </div>
                </div>

                <div className="topbar-right">
                    <button className="icon-btn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                    </button>
                    <div className="user-profile">
                        <div className="avatar">U</div>
                        <span>User</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopBar
