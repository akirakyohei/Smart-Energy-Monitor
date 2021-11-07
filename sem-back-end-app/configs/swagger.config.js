const swaggerJSDoc = require('swagger-jsdoc');
const PORT = process.env.PORT || 8080;
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
    },
    servers: [
        { url: `http://localhost:${PORT}` }
    ],
    consumes: ["application/json"],
    produces: ["application/json"]
};
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', "./entities/*.js", "./models/*.js"],
};
module.exports = swaggerJSDoc(options);