import Movie from '../models/movie.model.js';

export const movieController = {

    listMovies: async (req, res) => {
        try {
            const allMovies = await Movie.find();
            res.json(allMovies);
        } catch (error) {
            req.status(400).json({ message: error.message });
        }
    }
};