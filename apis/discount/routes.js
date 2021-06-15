const schema = require( './schema' );

async function routes( fastify, options ) {
    // http controller (handler)
    const { httpHandlers } = fastify;

    // GET get all discounts list
    fastify.get( '/', { "schema": schema.allDiscountsSeller, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.getAllDiscounts );
    // POST create a new discount
    fastify.post( '/', { "schema": schema.createDiscount, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.createDiscount );
    // DELETE delete discount
    fastify.delete( '/:discountUUID', { "schema": schema.deleteDiscount, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.deleteDiscount );
    // GET a discount
    fastify.get( '/:discountUUID', { "schema": schema.getDiscount, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.getById );
    // VALIDATE a discount
    fastify.get( '/:discountCode/validate', { "schema": schema.validateDiscount, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.validateAndGetDiscount );
    // PUT edit a discount
    fastify.put( '/:discountUUID', { "schema": schema.editDiscount, "preHandler": fastify.authenticate, "attachValidation": true }, httpHandlers.editDiscount );

    fastify.get( '/getUserDiscount', { }, httpHandlers.getUserDiscount );
}

module.exports = routes;
