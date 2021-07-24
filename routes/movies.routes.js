import { Router } from 'express';
import { movieController } from '../controllers/movie.controller.js';
import checkJWT from '../middlewares/checkJWT.js';

const movieRoutes = Router();

movieRoutes.get('/', movieController.listMovies);
movieRoutes.get('/:id', movieController.findMovieById);
movieRoutes.get('/search/title', movieController.findMovieByTitle); // use query params
movieRoutes.get('/search/genre_id/:genreId', movieController.filterByGenreId);
movieRoutes.get('/search/genre_name/:genreName', movieController.filterByGenreName);

export default movieRoutes;