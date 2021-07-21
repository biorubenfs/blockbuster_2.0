import User from '../models/user.model.js';
import Bcrypt from 'bcrypt';

export const userController = {

    updateUser: async (req, res) => {

        const username = req.body.username;

        let password;
        if (req.body.password) {
            password = Bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS));
        }

        const body = {};

        if (username) { body.username = username }
        if (password) { body.password = password }
        if (req.file.path) { body.profile_picture = req.file.path }

        const user = await User.findByIdAndUpdate({ _id: req.params.id }, body, { new: true });

        res.status(200).json(user);
    }
}