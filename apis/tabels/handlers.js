module.exports = async( fastify, opts ) => {
    const httpHandlers = {
        "getBySeller": async( req, res ) => {
            let { id } = req.params;
            let { floor } = req.query;
            let tabel_r = await fastify.tabelService.get( id, floor );
            res.code( tabel_r.code ).send( tabel_r.data );
        },
        "getMy": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { floor } = req.query;
            let tabel_r = await fastify.tabelService.get( uuid, floor );
            res.code( tabel_r.code ).send( tabel_r.data );
        },
        "add": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { name, floor, price, capacity } = req.body;
            let tabel_r = await fastify.tabelService.add( uuid, name, floor, price, capacity );
            res.code( tabel_r.code ).send( tabel_r.data );
        },
        "edit": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { "id": tabel } = req.params;
            let { name, floor, price, capacity } = req.body;
            let tabel_r = await fastify.tabelService.edit( uuid, tabel, name, floor, price, capacity );
            res.code( tabel_r.code ).send( tabel_r.data );
        },
        "delete": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid, isSeller } = req.user;
            if ( !isSeller ) {
                return res.status( 403 ).send( { "status": false, "msg": 'permission_denied' } );
            }
            let { "id": tabel } = req.params;
            let tabel_r = await fastify.tabelService.delete( uuid, tabel );
            res.code( tabel_r.code ).send( tabel_r.data );
        },
        "getByTiming": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { id, timing } = req.params;
            let { day } = req.query;
            if ( !day ) {
                day = Date.now();
            } else {
                day = Date.parse( day );
            }
            let tabel_r = await fastify.tabelService.getByTiming( id, timing, day );
            res.code( tabel_r.code ).send( tabel_r.data );
        }
    };
    fastify.decorate( "httpHandlers", httpHandlers );
};
