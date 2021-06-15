const schema = require( './schema' );
async function routes( fastify, options ) {
    const { httpHandlers } = fastify;

    fastify.get( '/orders', { "schema": schema.orders, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.orders );
    fastify.get( '/orders/:uuid', { "schema": schema.detail, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.detail );
    fastify.get( '/', { "schema": schema.get, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.get );
    fastify.post( '/:product', { "schema": schema.push, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.push );
    fastify.delete( '/:product', { "schema": schema.pop, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.pop );
    fastify.post( '/pay', { "schema": schema.pay, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.pay );
    fastify.get( '/verify', httpHandlers.verify );
}

module.exports = routes;
