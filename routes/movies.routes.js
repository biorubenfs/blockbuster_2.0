import { Router } from 'express';
import { movieController } from '../controllers/movie.controller.js';
import checkJWT from '../middlewares/checkJWT.js';

const movieRoutes = Router();

movieRoutes.get('/', checkJWT, movieController.listMovies);
movieRoutes.get('/:id', movieController.findMovieById);
movieRoutes.get('/title/:title', movieController.findMovieByTitle);

export default movieRoutes;