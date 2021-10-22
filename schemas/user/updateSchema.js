const updateSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        username: {
            type: 'string',
            minLength: 1,
            maxLength: 50
        },
        password: {
            type: 'string',
            minLength: 4,
            maxLength: 30
        }
    }
};


export default updateSchema;