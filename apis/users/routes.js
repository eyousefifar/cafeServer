const schema = require( './schema' );

async function routes( fastify, options ) {
    const { httpHandlers } = fastify;

    fastify.post( '/seller/register', { "attachValidation": true }, httpHandlers.registerSeller );
    fastify.get( '/seller/customers', { "preHandler": fastify.authenticate, "schema": schema.getAllSellerCustomers, "attachValidation": true }, httpHandlers.getAllSellerCustomers );
    fastify.post( '/user/login', { "schema": schema.loginUser, "attachValidation": true }, httpHandlers.loginUser );
    fastify.post( '/user/register', { "schema": schema.registerUser, "attachValidation": true }, httpHandlers.registerUser );
    fastify.get( '/user/profile', { "preHandler": fastify.authenticate }, httpHandlers.profile );
    fastify.post( '/verifyUser', { "schema": schema.login, "attachValidation": true }, httpHandlers.verifyUser );
    fastify.get( '/:id', { "schema": schema.seeSeller, "attachValidation": true }, httpHandlers.seeSeller );
    fastify.get( '/', { "preHandler": fastify.authenticate }, httpHandlers.profile );
    fastify.put( '/', { "schema": schema.edit, "attachValidation": true, "preHandler": [ fastify.authenticate, fastify.upload.single( 'avatar' ) ] }, httpHandlers.editProfile );
}

module.exports = routes;
