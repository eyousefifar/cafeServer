module.exports = async( fastify, opts ) => {
    const httpHandlers = {
        "get": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid } = req.user;
            let bookmark_r = await fastify.bookmarkService.get( uuid );
            res.code( bookmark_r.code ).send( bookmark_r.data );
        },
        "check": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid } = req.user;
            let { product } = req.body;
            let bookmark_r = await fastify.bookmarkService.check( uuid, product );
            res.code( bookmark_r.code ).send( bookmark_r.data );
        }
    };
    fastify.decorate( "httpHandlers", httpHandlers );
};
