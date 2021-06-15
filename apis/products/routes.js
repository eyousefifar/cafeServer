const schema = require( './schema' );
const multer = require( 'fastify-multer' );

async function routes( fastify, options ) {
    const { httpHandlers } = fastify;

    fastify.get( '/seller/:id', { "schema": schema.find, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.find );
    fastify.get( '/my', { "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.my );
    fastify.post( '/', { "schema": schema.add, "preHandler": [ fastify.authenticate, fastify.upload.single( 'image' ) ], "attachValidation": true }, httpHandlers.add );
    fastify.get( '/:id', { "schema": schema.getById, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.getById );
    fastify.put( '/:id', { "schema": schema.put, "preHandler": [ fastify.authenticate, fastify.upload.single( 'image' ) ], "attachValidation": true }, httpHandlers.put );
    fastify.delete( '/:id', { "schema": schema.delete, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.delete );
    fastify.post( '/:id', { "schema": schema.activeToggle, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.activeToggle );
}

module.exports = routes;
