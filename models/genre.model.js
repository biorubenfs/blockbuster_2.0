import mongoose from 'mongoose';

const genreSchema = mongoose.Schema({
    id: { type: Number },
    name: { type: String },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const Genre = mongoose.model('genres', genreSchema);

export default Genre;