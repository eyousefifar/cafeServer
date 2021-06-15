const schema = require( './schema' );
async function routes( fastify, options ) {
    const { httpHandlers } = fastify;

    fastify.get( '/', { "schema": schema.get, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.getMy );
    fastify.post( '/', { "schema": schema.add, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.add );
    fastify.get( '/:id', { "schema": schema.getBySeller }, httpHandlers.getBySeller );
    fastify.get( '/:id/:timing', { "schema": schema.getByTiming, "attachValidation": true }, httpHandlers.getByTiming );
    fastify.put( '/:id', { "schema": schema.edit, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.edit );
    fastify.delete( '/:id', { "schema": schema.delete, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.delete );
}

module.exports = routes;
