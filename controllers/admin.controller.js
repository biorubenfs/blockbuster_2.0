import Movie from "../models/movie.model.js";

export const adminController = {

    /** USER METHODS */

    createUser: async (req, res) => {
        // Todo
        console.log('Create a new User');
    },

    createAdmin: async (req, res) => {
        console.log('Create a new admin');
    },

    /**MOVIES METHODS */
    addMovie: async (req, res) => {
        // ToDo
        console.log("return the new movie");
    },

    updateMovie: async (req, res) => {
        // ToDo
        console.log("return the updated movie");
    },

    deleteMovie: async (req, res) => {
        // ToDo
        console.log("return the movie deleted");
    }
}