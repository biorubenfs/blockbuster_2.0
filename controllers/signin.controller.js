import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Bcrypt from 'bcrypt';

export const signinController = {

    signin: async (req, res) => {

        try {

            if (!req.body.email || !req.body.password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const email = req.body.email;
            const password = req.body.password;

            const queryUser = await User.findOne({ email: email });

            if (!queryUser) {
                return res.status(400).json({ message: 'Incorrect password or email [email]' });
            }
            if (!Bcrypt.compareSync(password, queryUser.password)) {
                return res.status(400).json({ message: 'Incorrect password or email [password]' });
            }

            const payload = {
                id: queryUser._id,
                email: queryUser.email,
                role: queryUser.role
            };

            const token = jwt.sign(payload, process.env.SECRET);
            // ToDo: save token in local storage

            res.json({ token: token });

        } catch (error) {
            res.status(400).json({ message: error.mesage });
        }
    }
};