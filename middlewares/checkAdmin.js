//import displayGandalf from '../utils/display_gandalf.js';

const checkAdmin = (req, res, next) => {

    if (req.token.role !== 'ADMIN') {
        // displayGandalf(req, res);

        res.status(403).json({ message: 'You are not authorized' });

    } else {
        next();
    }
};

export default checkAdmin;