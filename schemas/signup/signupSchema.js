const signupSchema = {
    type: 'object',
    required: ['username', 'password', 'email'],
    additionalProperties: false,
    properties: {
        username: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
        },
        password: {
            type: 'string',
            minLength: 4,
            maxLength: 30,
        },
        email: {
            type: 'string',
            maxLength: 50,
        },
    },
};

export default signupSchema;