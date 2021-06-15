module.exports = async( fastify, opts ) => {
    const httpHandlers = {
        "get": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid } = req.user;
            let like_r = await fastify.likeService.get( uuid );
            res.code( like_r.code ).send( like_r.data );
        },
        "like": async( req, res ) => {
            // like not woriking
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid } = req.user;
            let { id } = req.params;
            let like_r = await fastify.likeService.like( uuid, id );
            res.code( like_r.code ).send( like_r.data );
        }
    };
    fastify.decorate( "httpHandlers", httpHandlers );
};
