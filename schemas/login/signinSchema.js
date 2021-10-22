const signinSchema = {
    type: 'object',
    properties: {
        password: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
    },
    required: ['password', 'email'],
    additionalProperties: false
};

export default signinSchema;