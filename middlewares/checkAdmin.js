import displayGandalf from '../utils/display_gandalf.js'

const checkAdmin = (req, res, next) => {

    console.log(req.token);

    if (req.token.role !== 'ADMIN') {
        console.log("Rechazado");
        displayGandalf(req, res);
    } else {
        next();
    }
}

export default checkAdmin;