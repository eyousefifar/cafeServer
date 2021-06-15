const fastifyPlugin = require( "fastify-plugin" );
const handlers = require( "./handlers" );
const routes = require( "./routes" );

// apis
const bookmarks = require( './apis/bookmarks' );
const comments = require( './apis/comments' );

module.exports = async function( fastify, opts ) {
    fastify.register( fastifyPlugin( handlers ) );
    fastify.register( routes );

    // register apis
    fastify.register( bookmarks, { "prefix": "/bookmarks" } );
    fastify.register( comments, { "prefix": "/comments" } );
};
