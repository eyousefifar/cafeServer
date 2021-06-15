module.exports = async( fastify, opts ) => {
    const httpHandlers = {
        "get": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { id } = req.params;
            let { skip, limit } = req.query;
            let comment_r = await fastify.commentService.get( id, skip, limit );
            res.code( comment_r.code ).send( comment_r.data );
        },
        "getNotAccepted": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { skip, limit } = req.query;
            let comment_r = await fastify.commentService.getNotAccepted( uuid, skip, limit );
            res.code( comment_r.code ).send( comment_r.data );
        },
        "accept": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { id } = req.params;
            let comment_r = await fastify.commentService.accept( uuid, id );
            res.code( comment_r.code ).send( comment_r.data );
        },
        "submit": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid } = req.user;
            let { id } = req.params;
            let { text, cleaning, environment, quality, deal } = req.body;
            let comment_r = await fastify.commentService.submit( id, uuid, text, cleaning, environment, quality, deal );
            res.code( comment_r.code ).send( comment_r.data );
        },
        "delete": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid } = req.user;
            let { id } = req.params;
            let comment_r = await fastify.commentService.delete( uuid, id );
            res.code( comment_r.code ).send( comment_r.data );
        }
    };
    fastify.decorate( "httpHandlers", httpHandlers );
};
