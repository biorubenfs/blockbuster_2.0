const createUserSchema = {
    type: 'object',
    required: ['movieId'],
    additionalProperties: false,
    properties: {
        username: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
        },
        email: {
            type: 'string',
            maxLength: 50,
        },
        password: {
            type: 'string',
            minLength: 4,
            maxLength: 30,
        },
        role: {
            type: 'string',
            enum: ['ADMIN', 'USER']
        }
    },
};

export default createUserSchema;