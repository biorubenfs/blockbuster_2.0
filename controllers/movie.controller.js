import Movie from '../models/movie.model.js';
import Genre from '../models/genre.model.js';

import fs from 'fs';

// A simple method to format movie without some attributes
const formatMovie = (movie) => {

    /** 
     * This is neccessary in order to transform the mongoose object to plant JS object.
     * Alternatively, you can do .lean() after query, in order to convert the mongoose object
     * to javascript plain objet. In this way you can remove the movie.toJSON() and use the
     * movie object as js regular object.
     * */

    const fmt = movie.toJSON();

    delete fmt.__v;
    delete fmt.created_at;
    delete fmt.updated_at;

    return fmt;
}

export const movieController = {

    listMovies: async (req, res) => {
        try {
            const allMovies = await Movie.find();

            const result = allMovies.map(formatMovie);

            res.json(result);


            // res.json(allMovies.map(formatMovie));
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
            res.json(formatMovie(result));

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

            res.status(200).json(query.map(formatMovie));
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

            res.json(results);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};