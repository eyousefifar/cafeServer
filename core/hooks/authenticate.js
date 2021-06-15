const ClientError = require( "../types/ClientError" );

module.exports = async( req, res ) => {
    try {
        await req.jwtVerify();
    } catch ( err ) {
        return res.code( 401 ).send( { "status": false, "msg": "خطا در اعتبار سنجی اطلاعات" } );
    }
};

