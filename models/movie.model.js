import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    title: { type: String },
    year: { type: String },
    overview: { type: String },
    cast: { type: [String] },
    genres_ids: { type: [Number] },
    poster_path: { type: String }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const Movie = mongoose.model('movies', movieSchema);

export default Movie;