const schema = require( './schema' );

async function routes( fastify, options ) {
    const { httpHandlers } = fastify;

    fastify.get( '/:seller', { "schema": schema.getSeller }, httpHandlers.getSeller );
    fastify.get( '/', { "schema": schema.get, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.get );
    fastify.post( '/', { "schema": schema.add, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.add );
    fastify.delete( '/:id', { "schema": schema.delete, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.delete );
}

module.exports = routes;
