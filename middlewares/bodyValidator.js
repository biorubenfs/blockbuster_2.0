import Ajv from 'ajv';

const ajv = new Ajv();

const bodyValidator = (schema) => {

    return (req, res, next) => {
        const validate = ajv.compile(schema);
        const valid = validate(req.body);

        if (!valid) {
            res.status(400).json({ message: 'Body validation error' });
        }

        next();
    };
};

export default bodyValidator;
