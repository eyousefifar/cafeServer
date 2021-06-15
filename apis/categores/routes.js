const schema = require( './schema' );
const multer = require( 'fastify-multer' );

async function routes( fastify, options ) {
    const { httpHandlers } = fastify;

    fastify.get( '/:seller', { "schema": schema.get }, httpHandlers.get );
    fastify.post( '/', { "schema": schema.add, "preHandler": [ fastify.authenticate, fastify.upload.single( 'image' ) ], "attachValidation": true }, httpHandlers.add );
    fastify.put( '/:id', { "schema": schema.put, "preHandler": [ fastify.authenticate, fastify.upload.single( 'image' ) ], "attachValidation": true }, httpHandlers.edit );
    fastify.delete( '/:id', { "schema": schema.delete, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.delete );
}

module.exports = routes;
