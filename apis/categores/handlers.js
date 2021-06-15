module.exports = async( fastify, opts ) => {
    const httpHandlers = {
        "get": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { seller } = req.params;
            let category_r = await fastify.categoryService.get( seller );
            res.code( category_r.code ).send( category_r.data );
        },
        "add": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { file } = req;
            let image;
            if ( file && file.location ) {
                image = file.location;
            }
            let { name, desc } = req.body;
            let category_r = await fastify.categoryService.add( uuid, name, desc, image );
            res.code( category_r.code ).send( category_r.data );
        },
        "edit": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { id } = req.params;
            let { file } = req;
            let image;
            if ( file && file.location ) {
                image = file.location;
            }
            let { name, desc } = req.body;
            let category_r = await fastify.categoryService.edit( id, uuid, name, desc, image );
            res.code( category_r.code ).send( category_r.data );
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
            let category_r = await fastify.categoryService.delete( uuid, id );
            res.code( category_r.code ).send( category_r.data );
        }
    };
    fastify.decorate( "httpHandlers", httpHandlers );
};
