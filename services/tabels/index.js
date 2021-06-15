const fastifyPlugin = require( "fastify-plugin" );
const Logics = require( "./logics" );

module.exports = fastifyPlugin(
    async( fastify, opts ) => {
        const logics = new Logics( fastify.models, fastify.Sequelize );
        fastify.decorate( "tabelService", logics );
    }
);
