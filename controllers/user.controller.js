import User from '../models/user.model.js';
import Bcrypt from 'bcrypt';
import { formatObject } from '../utils/utils.js'

export const userController = {

    updateUser: async (req, res) => {

        try {

            const userId = req.token.id;
            const username = req.body.username;
            let password;

            if (req.body.password) {
                password = Bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS));
            }

            const body = {};

            if (username) { body.username = username }
            if (password) { body.password = password }
            if (req.file.path) { body.profile_picture = req.file.path }

            const user = await User.findByIdAndUpdate(userId, body, { new: true });

            res.status(200).json(formatObject(user));

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    userDetails: async (req, res) => {

        try {

            const user = await User.findById(req.token.id, { password: 0 });
            console.log(user);

            res.json(formatObject(user));

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteUser: async (req, res) => {

        try {

            const userDeleted = await User.findByIdAndDelete(req.token.id);
            res.json(formatObject(userDeleted));

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}