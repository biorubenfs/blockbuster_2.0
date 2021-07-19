import Movie from '../models/movie.model.js';

// A simple method to format movie without some attributes
const formatMovie = (movie) => {

    delete movie.__v;
    delete movie.created_at;
    delete movie.updated_at;

    return movie;
}

export const movieController = {

    listMovies: async (req, res) => {
        try {
            const allMovies = await Movie.find();
            res.json(allMovies);
        } catch (error) {
            req.status(400).json({ message: error.message });
        }
    },

    findMovieById: async (req, res) => {

        try {
            const result = await Movie.findById(req.params.id).lean();

            if (!result) {
                res.status(404).send({ message: "movie not found" });
            }
            res.json(formatMovie(result));

        } catch (error) {
            res.json({ message: error.message });
        }
    },

    findMovieByTitle: async (req, res) => {

        try {
            const queryTerm = req.params.title;

            // const query = await Movie.find({ title: /${queryTerm}/i });

            const query = await Movie.find({
                title: {
                    $regex: queryTerm,
                    $options: "i"
                }
            });

            res.status(200).json(query);
        } catch (error) {
            req.json({ message: error.message });
        };
    }
};