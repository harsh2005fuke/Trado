import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { HoldingsModel } from './models/HoldingsModel.js';
import { PositionsModel } from './models/PositionsModel.js';
import { OrdersModel } from './models/OrdersModel.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/zerodha';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(MONGO_URL)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Trado API is running!' });
});

// Get all holdings
app.get('/allHoldings', async (req, res) => {
    try {
        const holdings = await HoldingsModel.find({});
        res.json(holdings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all positions
app.get('/allPositions', async (req, res) => {
    try {
        const positions = await PositionsModel.find({});
        res.json(positions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all orders
app.get('/allOrders', async (req, res) => {
    try {
        const orders = await OrdersModel.find({});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new order
app.post('/newOrder', async (req, res) => {
    try {
        const { name, qty, price, mode } = req.body;
        const newOrder = new OrdersModel({
            name,
            qty,
            price,
            mode
        });
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
