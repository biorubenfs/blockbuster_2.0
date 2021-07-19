import { Router } from 'express';
import { movieController } from '../controllers/movie.controller.js';

const movieRoutes = Router();

// movieRoutes.get('/', movieController.listMovies);
movieRoutes.get('/:id', movieController.findMovieById);
movieRoutes.get('/title/:title', movieController.findMovieByTitle);

export default movieRoutes;