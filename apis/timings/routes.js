const schema = require( './schema' );
async function routes( fastify, options ) {
    const { httpHandlers } = fastify;

    fastify.get( '/:seller', httpHandlers.getSeller );
    fastify.get( '/', { "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.get );
    fastify.post( '/', { "schema": schema.add, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.add );
    fastify.delete( '/:uuid', { "schema": schema.delete, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.delete );
    fastify.post( '/:uuid', { "schema": schema.statusToggle, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.statusToggle );
}

module.exports = routes;
