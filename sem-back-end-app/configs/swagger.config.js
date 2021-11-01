const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
    },
};
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
}
module.exports = swaggerJSDoc(options);