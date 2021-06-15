module.exports = async( fastify, options ) => {
    const httpHandlers = {
        "getById": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            const { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { discountUUID } = req.params;
            let discount = await fastify.discountService.getDiscount( uuid, discountUUID );
            res.code( discount.code ).send( discount.data );
        },
        "getAllDiscounts": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            const { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let discounts = await fastify.discountService.getAllDiscounts( uuid );
            res.code( discounts.code ).send( discounts.data );
        },
        "createDiscount": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            const { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { code, percentage, expDate, maxValue, templateType } = req.body;
            let discount = await fastify.discountService.createDiscount( uuid, code, percentage, expDate, maxValue, templateType );
            res.code( discount.code ).send( discount.data );
        },
        "deleteDiscount": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            const { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { discountUUID } = req.params;
            let discount = await fastify.discountService.deleteDiscount( uuid, discountUUID );
            res.code( discount.code ).send( discount.data );
        },
        "editDiscount": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            const { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { discountUUID } = req.params;
            let { code, percentage, expDate, maxValue, templateType } = req.body;

            let discount = await fastify.discountService.editDiscount( uuid, discountUUID, code, percentage, expDate, maxValue, templateType );
            res.code( discount.code ).send( discount.data );
        },
        "validateAndGetDiscount": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { discountCode } = req.params;
            let discountPrecentage = await fastify.discountService.validateDiscountByCode( discountCode );
            res.code( discountPrecentage.code ).send( discountPrecentage.data );
        },
        "getUserDiscount": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let discountPrecentage = await fastify.discountService.getUserDiscount();
            res.code( discountPrecentage.code ).send( discountPrecentage.data );
        }
    };
    fastify.decorate( "httpHandlers", httpHandlers );
};
