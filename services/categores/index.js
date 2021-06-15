const fastifyPlugin = require( "fastify-plugin" );
const Logics = require( "./logics" );

module.exports = fastifyPlugin(
    async( fastify, opts ) => {
        const logics = new Logics( fastify.models, fastify.sequelize );
        fastify.decorate( "categoryService", logics );
    }
);
