const schema = require( './schema' );
async function routes( fastify, options ) {
    const { httpHandlers } = fastify;

    fastify.get( '/', { "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.get );
    fastify.post( '/:id', { "schema": schema.like, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.like );
}

module.exports = routes;
