const newOrderSchema = {
    type: 'object',
    required: ['movieId'],
    additionalProperties: false,
    properties: {
        movieId: {
            type: 'string',
            minLength: 24,
            maxLength: 24,
        }
    },
};

export default newOrderSchema;