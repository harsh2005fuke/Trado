import mongoose from 'mongoose';

const OrdersSchema = new mongoose.Schema({
    name: String,
    qty: Number,
    price: Number,
    mode: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const OrdersModel = mongoose.model('order', OrdersSchema);
