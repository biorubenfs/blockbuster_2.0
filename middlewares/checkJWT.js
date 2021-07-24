import jwt from 'jsonwebtoken';

const checkJWT = (req, res, next) => {

    let rawToken;

    if (!req.headers.authorization) {
        return next('Token not found');
    };

    if (req.headers.authorization.split(' ')[0] === 'Bearer') {

        try {

            rawToken = req.headers.authorization.split(' ')[1];
            const token = jwt.verify(rawToken, process.env.SECRET);
            req.token = token;
            next();

        } catch (error) {
            return next('Invalid Token')
        }
    };
};

export default checkJWT