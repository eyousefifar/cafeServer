module.exports = async( fastify, opts ) => {
    const httpHandlers = {
        "find": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { id } = req.params;
            let { uuid, isSeller } = req.user;
            let { category, search } = req.query;
            let product_r = await fastify.productService.findProduct( id, uuid, category, search, false );
            res.code( product_r.code ).send( product_r.data );
        },
        "my": async( req, res ) => {
            if ( req.validationError ) {
                res.code( 400 ).send( req.validationError );
            }
            let { uuid } = req.user;
            let { category, search } = req.query;
            let product_r = await fastify.productService.findProduct( uuid, uuid, category, search, true );
            res.code( product_r.code ).send( product_r.data );
        },
        "add": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { file } = req;
            let image;
            if ( file && file.location ) {
                image = file.location;
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.send( { "status": false, "msg": 'permission_denied' } );
            }
            let { name, desc, price, category } = req.body;
            let product_r = await fastify.productService.addProduct( uuid, name, desc, price, category, image );
            res.code( product_r.code ).send( product_r.data );
        },
        "getById": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            let { id } = req.params;
            let product_r = await fastify.productService.getProduct( id, isSeller );
            res.code( product_r.code ).send( product_r.data );
        },
        "put": async( req, res ) => {
            // check always true
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { file } = req;
            let image;
            if ( file && file.location ) {
                image = file.location;
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.send( { "status": false, "msg": 'permission_denied' } );
            }
            let { id } = req.params;
            let { name, desc, price, category } = req.body;
            let product_r = await fastify.productService.editProduct( uuid, id, name, desc, price, category, image );
            res.code( product_r.code ).send( product_r.data );
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
            let product_r = await fastify.productService.deleteProduct( uuid, id );
            res.code( product_r.code ).send( product_r.data );
        },
        "activeToggle": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { id } = req.params;
            let { status } = req.body;
            let product_r = await fastify.productService.statusToggle( uuid, id, status );
            res.code( product_r.code ).send( product_r.data );
        }
    };
    fastify.decorate( "httpHandlers", httpHandlers );
};
