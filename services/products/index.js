const fastifyPlugin = require( 'fastify-plugin' );
const Logics = require( './logics' );

// services
const like = require( './services/likes' );

module.exports = fastifyPlugin(
    async( fastify, opts ) => {
        const logics = new Logics( fastify.models, fastify.sequelize );
        fastify.decorate( 'productService', logics );

        // register services
        fastify.register( like );
    }
);
