const schema = require( './schema' );

async function routes( fastify, options ) {
    const { httpHandlers } = fastify;

    fastify.get( '/', { "schema": schema.getNotAccepted, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.getNotAccepted );
    fastify.get( '/:id', { "schema": schema.get }, httpHandlers.get );
    fastify.put( '/:id', { "schema": schema.accept, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.accept );
    fastify.post( '/:id', { "schema": schema.submit, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.submit );
    fastify.delete( '/:id', { "schema": schema.delete, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.delete );
}

module.exports = routes;
