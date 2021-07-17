import mongoose from 'mongoose';

const ROLES = Object.freeze({
    USER: 'USER',
    ADMIN: 'ADMIN',
})

const userSchema = mongoose.Schema({
    username: { type: String },
    email: { String },
    password: { String },
    role: { type: String, enum: Object.values(ROLES), default: 'USER' },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const User = mongoose.model('users', userSchema)

export default User;