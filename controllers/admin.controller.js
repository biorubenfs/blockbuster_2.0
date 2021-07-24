import Movie from "../models/movie.model.js";
import User from '../models/user.model.js';

import { formatUser } from '../utils/utils.js'

import Bcrypt from 'bcrypt';

export const adminController = {

    /** USER METHODS */

    createUser: async (req, res) => {

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

    listUsers: async (req, res) => {

        try {

            // Convert string to boolean
            const admin = JSON.parse(req.query.admin);
            const user = JSON.parse(req.query.user);

            let users;

            if (admin && user) {
                // const users = await User.find().sort('-created_at');
                users = await User.find().sort({ created_at: 1 });
            };

            if (admin && !user) {
                users = await User.find({ role: 'ADMIN' }).sort({ created_at: 1 });
            };

            if (!admin && user) {
                users = await User.find({ role: 'USER' }).sort({ created_at: 1 });
            };

            res.json(users.map(formatUser));

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