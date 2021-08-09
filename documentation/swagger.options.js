// Options object for SWAGGER
const swaggerOptions = (port) => ({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Blockbuster API',
            version: '1.0.0',
            description:
                'This is a simple CRUD API application made with Express and documented with Swagger',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
        },
        servers: [
            {
                // In our case, we specified only one server where documentation will be available
                url: `http://localhost:${port}`
            },
            {
                url: 'http://localhost:4000'
            }
        ]
    },
    // apis: ['app.js'],
    // This specifies to swagger where it should recover information
    apis: ['./documentation/*.doc.yaml'],
});

export default swaggerOptions;