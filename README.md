# Trado - MERN Stack

A full-stack trading platform built with MongoDB, Express, React, and Node.js.

## 🚀 Features

- **Dashboard**: Overview of portfolio with total holdings, positions, and P&L
- **Holdings**: View and manage your stock holdings
- **Positions**: Track active trading positions
- **Orders**: Place buy/sell orders and view order history
- **Watchlist**: Monitor stocks with real-time price updates
- **Modern UI**: Beautiful, responsive design with Zerodha-inspired aesthetics

## 📁 Project Structure

```
trado/
├── backend/
│   ├── models/
│   │   ├── HoldingsModel.js
│   │   ├── PositionsModel.js
│   │   └── OrdersModel.js
│   ├── server.js
│   ├── initDB.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TopBar.jsx
    │   │   ├── WatchList.jsx
    │   │   ├── Summary.jsx
    │   │   ├── Holdings.jsx
    │   │   ├── Positions.jsx
    │   │   ├── Orders.jsx
    │   │   └── BuyActionWindow.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or connection string)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Configure environment variables in `.env`:
```
PORT=3002
MONGO_URL=mongodb://localhost:27017/zerodha
```

3. Initialize database with sample data:
```bash
node initDB.js
```

4. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open browser at `http://localhost:3000`

## 🎨 Tech Stack

**Frontend:**
- React 18
- React Router
- Axios
- Vite
- Vanilla CSS

**Backend:**
- Node.js
- Express
- MongoDB
- Mongoose

## 📝 API Endpoints

- `GET /allHoldings` - Fetch all holdings
- `GET /allPositions` - Fetch all positions
- `GET /allOrders` - Fetch all orders
- `POST /newOrder` - Place a new order

## 🎯 Usage

1. Start with the landing page at `/`
2. Click "Get Started" to access the dashboard
3. Navigate between tabs: Dashboard, Holdings, Positions, Orders
4. Use the watchlist sidebar to monitor stocks
5. Click Buy/Sell buttons to place orders
6. View order history in the Orders tab

## 🌟 Features Highlight

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Updates**: Dynamic data fetching from backend
- **Interactive UI**: Smooth animations and transitions
- **Professional Aesthetics**: Modern design inspired by Zerodha

## 📄 License

This is a learning project.
