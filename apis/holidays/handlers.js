module.exports = async( fastify, opts ) => {
    const httpHandlers = {
        "getSeller": async( req, res ) => {
            let { seller } = req.params;
            let holiday_r = await fastify.holidayService.get( seller );
            res.send( holiday_r );
        },
        "get": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            let holiday_r = await fastify.holidayService.get( uuid );
            res.send( holiday_r );
        },
        "add": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { day } = req.body;
            let holiday_r = await fastify.holidayService.add( uuid, day );
            res.status( holiday_r.code ).send( holiday_r.data );
        },
        "delete": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { id } = req.params;
            let holiday_r = await fastify.holidayService.delete( uuid, id );
            res.send( holiday_r );
        }

    };
    fastify.decorate( "httpHandlers", httpHandlers );
};
