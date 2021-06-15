const fastifyPlugin = require( "fastify-plugin" );
const controllers = require( "./handler" );
const routes = require( "./routes" );

module.exports = async function( fastify, options ) {
    fastify.register( fastifyPlugin( controllers ) );
    fastify.register( routes );
};
