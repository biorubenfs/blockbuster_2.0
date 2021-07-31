import Movie from '../models/movie.model.js';
import Genre from '../models/genre.model.js';

import { formatObject } from '../utils/utils.js';

export const movieController = {

    listMovies: async (req, res) => {
        try {
            const allMovies = await Movie.find();

            const result = allMovies.map(formatObject);

            res.json(result);

        } catch (error) {
            req.status(400).json({ message: error.message });
        }
    },

    findMovieById: async (req, res) => {

        try {
            const result = await Movie.findById(req.params.id);

            if (!result) {
                res.status(404).send({ message: "movie not found" });
            }
            res.json(formatObject(result));

        } catch (error) {
            res.json({ message: error.message });
        }
    },

    findMovieByTitle: async (req, res) => {

        // ToDo: do search algorithm

        try {
            const queryTerm = req.query.title;

            // const query = await Movie.find({ title: /${queryTerm}/i });

            const query = await Movie.find({
                title: {
                    $regex: queryTerm,
                    $options: "i"
                }
            });

            res.status(200).json(query.map(formatObject));
        } catch (error) {
            req.json({ message: error.message });
        };
    },

    filterByGenreId: async (req, res) => {

        const genreId = req.params.genreId

        try {
            const results = await Movie.find({ genres_ids: genreId });
            res.json(results.map(formatMovie));
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    filterByGenreName: async (req, res) => {

        try {
            const genreName = req.params.genreName

            // const genresList = fs.readFileSync('./seeds/raw_data/genres.json');
            // const genres = JSON.parse(genresList);
            // const genreId = genres.filter(item => item.name === genre)[0].id;

            // Beware with _id and id in this case. Change: to use const to avoid db query
            const genre = await Genre.findOne({ name: genreName });
            if (!genre) {
                return res.json({ message: "Genre not found" });
            }
            const results = await Movie.find({ genres_ids: genre.id })

            res.json(results.map(formatObject));

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};