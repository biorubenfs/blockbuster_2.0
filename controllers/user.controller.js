import User from '../models/user.model.js';
import Bcrypt from 'bcrypt';


const formatUser = (user) => {

    // Here que use toJSON, because we didn't use .lean in mongoose query
    const fmt = user.toJSON();

    delete fmt.created_at;
    delete fmt.updated_at;
    delete fmt.__v;

    return fmt;
}

export const userController = {

    updateUser: async (req, res) => {

        // ToDo: Add everything in a tryCatch block

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
    },

    userDetails: async (req, res) => {

        try {

            const user = await User.findById(req.token.id, { password: 0 });
            console.log(user);

            res.json(formatUser(user));

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}