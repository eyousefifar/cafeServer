const fastifyPlugin = require( "fastify-plugin" );
const handlers = require( "./handlers" );
const routes = require( "./routes" );

// apis
const likes = require( './apis/likes' );

module.exports = async function( fastify, opts ) {
    fastify.register( fastifyPlugin( handlers ) );
    fastify.register( routes );

    // register apis
    fastify.register( likes, { "prefix": "/likes" } );

};
