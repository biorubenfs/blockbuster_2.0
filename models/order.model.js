import mongoose from 'mongoose';

const STATUS = Object.freeze({
    ACTIVE: 'ACTIVE',
    EXPIRED: 'EXPIRED',
    CANCELED: 'CANCELED'
})

const orderSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
    },
    start_date: { type: String },
    end_date: { type: String },
    status: { type: String, enum: Object.values(STATUS), default: 'ACTIVE' }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const Order = mongoose.model('orders', orderSchema);

export default Order;