import User from '../models/user.model.js';

import Bcrypt from 'bcrypt';

export const signupController = {

    createUser: async (req, res) => {

        try {
            if (!req.body.username || !req.body.email || !req.body.password) {
                return res.status(400).json({ message: 'Username, email and password are required' });
            }

            const username = req.body.username;
            const email = req.body.email;

            // TODO: Validate Password here
            const password = Bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS))



            // Check if user already exists
            const userAlready = await User.findOne({ email: email });

            if (!userAlready) {

                const newUser = {
                    username: username,
                    email: email,
                    password: password
                };

                await User.create(newUser);
                res.send(newUser);
            } else {
                res.status(409).send({ message: 'User already exists' });
            }

        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
};