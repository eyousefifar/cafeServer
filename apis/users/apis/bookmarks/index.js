const fastifyPlugin = require( "fastify-plugin" );
const handlers = require( "./handlers" );
const routes = require( "./routes" );

module.exports = async function( fastify, opts ) {
    fastify.register( fastifyPlugin( handlers ) );
    fastify.register( routes );
};
