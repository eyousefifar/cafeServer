const fastifyPlugin = require( "fastify-plugin" );
const Logics = require( "./logics" );

// services
const bookmark = require( './services/bookmarks' );
const comment = require( './services/comments' );

module.exports = fastifyPlugin(
    async( fastify, opts ) => {
        const logics = new Logics( fastify.models, fastify.jwt, fastify.kavenegar, fastify.discountService );
        fastify.decorate( "userService", logics );

        // register services
        fastify.register( bookmark );
        fastify.register( comment );
    }
);
