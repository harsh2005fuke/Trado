import { useState } from 'react'
import TopBar from '../components/TopBar'
import WatchList from '../components/WatchList'
import Summary from '../components/Summary'
import Holdings from '../components/Holdings'
import Positions from '../components/Positions'
import Orders from '../components/Orders'
import './Dashboard.css'

function Dashboard() {
    const [activeTab, setActiveTab] = useState('summary')

    return (
        <div className="dashboard">
            <TopBar />

            <div className="dashboard-layout">
                <aside className="sidebar">
                    <WatchList />
                </aside>

                <main className="main-content">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'summary' ? 'active' : ''}`}
                            onClick={() => setActiveTab('summary')}
                        >
                            Dashboard
                        </button>
                        <button
                            className={`tab ${activeTab === 'holdings' ? 'active' : ''}`}
                            onClick={() => setActiveTab('holdings')}
                        >
                            Holdings
                        </button>
                        <button
                            className={`tab ${activeTab === 'positions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('positions')}
                        >
                            Positions
                        </button>
                        <button
                            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            Orders
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'summary' && <Summary />}
                        {activeTab === 'holdings' && <Holdings />}
                        {activeTab === 'positions' && <Positions />}
                        {activeTab === 'orders' && <Orders />}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard
