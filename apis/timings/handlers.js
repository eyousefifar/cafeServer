module.exports = async( fastify, opts ) => {
    const httpHandlers = {
        "add": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { at } = req.body;
            let timing_r = await fastify.timingService.add( uuid, at );
            res.code( timing_r.code ).send( timing_r.data );
        },
        "statusToggle": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { "uuid": timing } = req.params;
            if ( !req.body ) {
                return res.send( { "status": false, "msg": "status_notfound" } );
            }
            let { status } = req.body;
            let timing_r = await fastify.timingService.statusToggle( timing, uuid, status );
            res.code( timing_r.code ).send( timing_r.data );
        },
        "delete": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { "uuid": timing } = req.params;
            let timing_r = await fastify.timingService.delete( timing, uuid );
            res.code( timing_r.code ).send( timing_r.data );
        },
        "get": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let timing_r = await fastify.timingService.get( uuid, true );
            res.code( timing_r.code ).send( timing_r.data );
        },
        "getSeller": async( req, res ) => {
            let { seller } = req.params;
            let timing_r = await fastify.timingService.get( seller, false );
            res.code( timing_r.code ).send( timing_r.data );
        }

    };
    fastify.decorate( "httpHandlers", httpHandlers );
};
