const schema = require( './schema' );

async function routes( fastify, options ) {
    const { httpHandlers } = fastify;

    fastify.get( '/', { "schema": schema.get, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.get );
    fastify.post( '/', { "schema": schema.check, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.check );

}

module.exports = routes;
