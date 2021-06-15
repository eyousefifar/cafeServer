module.exports = async( fastify, opts ) => {
    const httpHandlers = {
        "registerSeller": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { name, phone } = req.body;
            let user_r = await fastify.userService.registerSeller( name, phone );
            res.code( user_r.code ).send( user_r.data );
        },
        "loginUser": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { phone } = req.body;
            let user_r = await fastify.userService.loginUser( phone );
            res.code( user_r.code ).send( user_r.data );
        },
        "registerUser": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { phone, name, bday, familiarity } = req.body;
            let user_r = await fastify.userService.registerUser( name, phone, bday, familiarity );
            res.code( user_r.code ).send( user_r.data );
        },
        "verifyUser": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { phone, verifyCode } = req.body;
            let user_r = await fastify.userService.verifyUser( phone, verifyCode );
            res.code( user_r.code ).send( user_r.data );
        },
        "seeSeller": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { id } = req.params;
            let user_r = await fastify.userService.seeSeller( id );
            res.code( user_r.code ).send( user_r.data );
        },
        "getAllSellerCustomers": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let users = await fastify.userService.getAllSellerCustomers( req.query.groupBy );
            res.code( users.code ).send( users.data );
        },
        "profile": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { uuid } = req.user;
            let user_r = await fastify.userService.getUser( uuid );
            res.code( user_r.code ).send( user_r.data );
        },
        "editProfile": async( req, res ) => {
            if ( req.validationError ) {
                return res.code( 400 ).send( req.validationError );
            }
            let { file } = req;
            let image;
            if ( file && file.location ) {
                image = file.location;
            }
            let { uuid } = req.user;
            let { name, phone, familiarity, bday, address, sellerDescription } = req.body;
            let user_r = await fastify.userService.editUser( uuid, name, phone, bday, familiarity, address, image, sellerDescription );
            res.code( user_r.code ).send( user_r.data );
        }
    };
    fastify.decorate( "httpHandlers", httpHandlers );
};
