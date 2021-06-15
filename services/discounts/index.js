const fastifyPlugin = require( "fastify-plugin" );
const Logics = require( "./logics" );

module.exports = fastifyPlugin(
    async( fastify, options ) => {
        const logics = new Logics( fastify.models, fastify.jwt, fastify.kavenegar );
        fastify.decorate( "discountService", logics );
    }
);
