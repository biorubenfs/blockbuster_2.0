import Movie from '../models/movie.model.js';

export const getAllMoviesService = async ({ mongoQuery, moreStuff }) => {
    console.log('in service #######');

    // Do things with 'stuff'
    console.log(moreStuff);

    const movies = await Movie.find(mongoQuery);
    return movies;
};

