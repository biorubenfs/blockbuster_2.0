import User from '../models/user.model.js';
import Order from '../models/order.model.js';

import { formatObject } from '../utils/utils.js';

import Bcrypt from 'bcrypt';

export const adminController = {

    /** USER METHODS */

    // Create regular or admin user
    createUser: async (req, res) => {

        try {

            const username = req.body.username;
            const email = req.body.email;
            let password = req.body.password;
            const role = req.body.role || 'USER';

            const alreadyUser = await User.findOne({ email: email });

            if (alreadyUser) {
                return res.status(409).json({ message: 'email is already registered' });
            }

            password = Bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));

            const newUser = {
                username, email, password, role
            };

            await User.create(newUser);

            res.status(200).json(newUser);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // updateUser: async (req, res) => {
    //     // ToDo
    //     console.log('return the updated user');
    // },

    // deleteUser: async (req, res) => {
    //     // ToDo
    //     console.log('return the deleted user');
    // },

    listUsers: async (req, res) => {

        // example of petition in postman
        // http://localhost:3000/admin/user?admin=true&user=false   => it returns admin users

        try {

            // Convert string to boolean
            const admin = JSON.parse(req.query.admin);
            const user = JSON.parse(req.query.user);

            let users;

            if (admin && user) {
                // const users = await User.find().sort('-created_at');
                users = await User.find().sort({ created_at: 1 });
            } else if (admin && !user) {
                users = await User.find({ role: 'ADMIN' }).sort({ created_at: 1 });
            } else if (!admin && user) {
                users = await User.find({ role: 'USER' }).sort({ created_at: 1 });
            } else {
                users = [];
            }

            res.json(users.map(formatObject));

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    /**MOVIES METHODS */
    // addMovie: async (req, res) => {
    //     // ToDo
    //     console.log('return the new movie');
    // },

    // updateMovie: async (req, res) => {
    //     // ToDo
    //     console.log('return the updated movie');
    // },

    // deleteMovie: async (req, res) => {
    //     //ToDo
    //     console.log('return the delete movie');
    // },

    /** ORDERS METHODS */

    getAllOrders: async (req, res) => {

        try {

            const results = await Order.find().populate('user_id', ['email', 'username']).populate('movie_id', 'title');

            // Another way to do the same task
            // const results = await Order.find().populate({ path: 'user_id', select: ['email', 'username'] });

            res.json(results.map(formatObject));

        } catch (error) {

            res.status(400).json({ message: error.message });

        }
    },
};