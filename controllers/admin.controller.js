import Movie from "../models/movie.model.js";
import User from '../models/user.model.js';

import Bcrypt from 'bcrypt';

export const adminController = {

    /** USER METHODS */

    createUser: async (req, res) => {

        console.log(req.body);

        try {

            const username = req.body.username;
            const email = req.body.email;
            let password = req.body.password;
            const role = req.body.role || 'USER';

            const alreadyUser = await User.findOne({ email: email });

            if (alreadyUser) {
                return res.status(409).json({ message: "email is already registered" });
            }

            password = Bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));

            const newUser = {
                username, email, password, role
            }

            await User.create(newUser);

            res.status(200).json(newUser);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
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