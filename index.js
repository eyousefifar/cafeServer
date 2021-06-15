require( 'dotenv' ).config();
const fastify = require( 'fastify' )();
const aws = require( 'aws-sdk' );
const fastifyJwt = require( "fastify-jwt" );
const fastifyCors = require( 'fastify-cors' );
const formbody = require( 'fastify-formbody' );
const multer = require( 'fastify-multer' );
const multerS3 = require( 'multer-s3' );
const Kavenegar = require( 'kavenegar' );
const Sequelize = require( 'sequelize' );
const fastifyStatic = require( 'fastify-static' );
const path = require( 'path' );
const sequelize = new Sequelize( process.env.LOCALDB, {
    "dialectOptions": {
        "useUTC": false
    },
    "timezone": "+03:30"
} );

// models
const models = require( './data/models' )( sequelize );

// hooks
const authenticate = require( './core/hooks/authenticate' );

// services
const productService = require( './services/products/' );
const categoryService = require( './services/categores' );
const reserveService = require( './services/reserves/' );
const tabelService = require( './services/tabels/' );
const userService = require( './services/users/' );
const timingService = require( './services/timing/' );
const holidayService = require( './services/holidays/' );
const discountService = require( './services/discounts' );

// apis
const productApi = require( './apis/products' );
const categoryApi = require( './apis/categores' );
const reserveApi = require( './apis/reserves' );
const tabelApi = require( './apis/tabels' );
const userApi = require( './apis/users' );
const timingApi = require( './apis/timings' );
const holidayApi = require( './apis/holidays' );
const discountApi = require( './apis/discount' );

fastify.register( multer.contentParser );
fastify.register( formbody );
fastify.register( fastifyCors );
fastify.register( fastifyJwt, { "secret": process.env.JWT_SECRET, "algorithms": [ "RS256" ] } );
fastify.decorate( "upload", multer( {
    "storage": multerS3( {
        "s3": new aws.S3( {
            "signatureVersion": 'v4',
            "s3ForcePathStyle": 'true',
            "endpoint": process.env.AWS_ENDPOINT
        } ),
        "bucket": 'uploads',
        "metadata": function( req, file, cb ) {
            cb( null, { "fieldName": `${file.fieldname }-${ Date.now()}` } );
        },
        "key": function( req, file, cb ) {
            cb( null, `${file.fieldname }-${ Date.now()}` );
        }
    } )
} ) );
fastify.decorate( "authenticate", authenticate );
fastify.decorate( "sequelize", sequelize );
fastify.decorate( "models", models );
fastify.decorate( "kavenegar", Kavenegar.KavenegarApi( { "apikey": process.env.KAVENEGAR } ) );

// register services
fastify.register( productService );
fastify.register( categoryService );
fastify.register( discountService );
fastify.register( reserveService );
fastify.register( tabelService );
fastify.register( userService );
fastify.register( timingService );
fastify.register( holidayService );

// register apis
fastify.register( productApi, { "prefix": '/products' } );
fastify.register( categoryApi, { "prefix": '/categores' } );
fastify.register( reserveApi, { "prefix": '/reserves' } );
fastify.register( tabelApi, { "prefix": '/tabels' } );
fastify.register( userApi, { "prefix": '/users' } );
fastify.register( timingApi, { "prefix": '/timing' } );
fastify.register( holidayApi, { "prefix": '/holiday' } );
fastify.register( discountApi, { "prefix": '/discounts' } );

fastify.register( fastifyStatic, { "prefix": '/uploads', "root": path.join( __dirname, 'uploads' ) } );
fastify.get( '/ping', ( req, res ) => {
    res.send( 'pong' );
} );

sequelize.authenticate().then( () => {
    console.log( `CafeChi\tv1\tpid:${ process.pid }\n====================================` );
    console.log( `DB\tSUCCESS` );
    fastify.listen( 5000, '0.0.0.0', ( err, address ) => {
        if ( err ) {
            console.log( err );
        }
        console.log( `Api\tSUCCESS` );
    } );
} ).catch( err => {
    console.error( 'DB\tFAIELD', err );
} );
