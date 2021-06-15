module.exports = async( fastify, opts ) => {
    const httpHandlers = {
        "detail": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { "uuid": reserveId } = req.params;
            let reserve_r = await fastify.reserveService.detail( uuid, reserveId );
            res.code( reserve_r.code ).send( reserve_r.data );
        },
        "orders": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { skip, limit, from, to } = req.query;
            let reserve_r = await fastify.reserveService.orders( uuid, skip, limit, from, to );
            res.code( reserve_r.code ).send( reserve_r.data );
        },
        "get": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid } = req.user;
            let reserve_r = await fastify.reserveService.getBasket( uuid );
            res.code( reserve_r.code ).send( reserve_r.data );
        },
        "push": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid } = req.user;
            let { product } = req.params;
            let count = 1;
            if ( req.body ) {
                count = req.body.count;
            }
            let reserve_r = await fastify.reserveService.pushBasket( uuid, product, count );
            res.code( reserve_r.code ).send( reserve_r.data );
        },
        "pop": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid } = req.user;
            let { product } = req.params;
            let reserve_r = await fastify.reserveService.popBasket( uuid, product );
            res.code( reserve_r.code ).send( reserve_r.data );
        },
        "pay": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid } = req.user;
            let { seller, tabel, day, at, discountCode } = req.body;
            let reserve_r = await fastify.reserveService.pay( uuid, seller, tabel, day, at, discountCode );
            res.code( reserve_r.code ).send( reserve_r.data );
        },
        "verify": async( req, res ) => {
            const { "clientrefid": clientRefId, "refid": refId } = req.query;
            console.log( { refId, clientRefId } );
            let reserve_r = await fastify.reserveService.verify( { refId, clientRefId } );
            res.code( reserve_r.code ).send( reserve_r.data );
        }
    };
    fastify.decorate( "httpHandlers", httpHandlers );
};
