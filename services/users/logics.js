class Logics {
    constructor( models, jwt, kavenegar, discountService ) {
        this.models = models;
        this.jwt = jwt;
        this.kavenegar = kavenegar;
        this.discountService = discountService;
    }
    async registerSeller( name, phone ) {
        let code = Math.floor( 1000 + Math.random() * 9000 );
        let user_t = await this.models.User.findOne( { "where": { phone } } );
        let user_r;
        if ( user_t ) {
            if ( user_t.isSeller ) {
                return { "code": 403, "data": { "status": false, "msg": 'duplicate' } };
            }
            user_r = await user_t.update( { "isSeller": true } );
        } else {
            user_r = await this.models.User.create( { name, phone, "isSeller": true, "verifyCode": code } );
        }
        // send SMS
        await this.kavenegar.VerifyLookup( { "receptor": phone, "token": code, "template": "verify-cafechi" } );
        console.log( `${user_r.uuid } : ${ code}` );
        return { "code": 200, "data": { "status": true } };
    }
    async verifyUser( phone, verifyCode ) {
        let user_r = await this.models.User.findOne( { "where": { "phone": phone, "verifyCode": verifyCode }, "attributes": { "exclude": [ 'hashedPassword', 'createdAt', 'verifyCode' ] } } );
        if ( !user_r ) {
            return { "code": 403, "data": { "status": false, "msg": "not_match", "token": undefined } };
        }
        await user_r.update( { "verifyCode": 0 } );
        if ( user_r.isSeller ) {
            delete user_r.isSeller;
        }
        if ( user_r.hashedPassword ) {
            delete user_r.hashedPassword;
        }
        if ( user_r.createdAt ) {
            delete user_r.createdAt;
        }
        if ( user_r.verifyCode ) {
            delete user_r.verifyCode;
        }
        const token = this.jwt.sign( { "uuid": user_r.uuid, "isSeller": user_r.isSeller } );
        // JWT
        return { "code": 200, "data": { "status": true, token, "user": user_r } };
    }
    async loginUser( phone ) {
        let user_r = await this.models.User.findOne( { "where": { phone } } );
        let code = Math.floor( 1000 + Math.random() * 9000 );
        if ( !user_r ) {
            return { "code": 404, "data": { "status": false, "msg": "user_notfound" } };
        }
        user_r = await user_r.update( { "verifyCode": code } );
        // send SMS
        await this.kavenegar.VerifyLookup( { "receptor": phone, "token": code, "template": "verify-cafechi" } );
        console.log( `${user_r.uuid } : ${ code}` );

        return { "code": 200, "data": { "status": true } };
    }
    async registerUser( name, phone, bday, familiarity ) {
        let user_r = await this.models.User.findOne( { "where": { phone } } );
        let code = Math.floor( 1000 + Math.random() * 9000 );
        if ( user_r ) {
            return { "code": 409, "data": { "status": false, "msg": "duplicate" } };
        }
        user_r = await this.models.User.create( { phone, name, bday, familiarity, "verifyCode": code, "isSeller": false } );
        // send SMS
        await this.kavenegar.VerifyLookup( { "receptor": phone, "token": code, "template": "verify-cafechi" } );
        console.log( `${user_r.uuid } : ${ code}` );
        return { "code": 200, "data": { "status": true } };
    }
    async getUser( userId ) {
        let user_r = await this.models.User.findOne( { "where": { "uuid": userId }, "attributes": { "exclude": [ 'hashedPassword', 'createdAt', 'verifyCode' ] } } );
        if ( !user_r ) {
            return { "code": 404, "data": { "status": false, "msg": "user_notfound" } };
        }
        return { "code": 200, "data": user_r };
    }
    async seeSeller( sellerId ) {
        let user_r = await this.models.User.findOne( { "where": { "uuid": sellerId, "isSeller": true }, "attributes": { "exclude": [ 'hashedPassword', 'createdAt', 'verifyCode' ] } } );
        if ( !user_r ) {
            return { "code": 404, "data": { "status": false, "msg": "user_notfound" } };
        }
        return { "code": 200, "data": user_r };
    }
    async getAllSellerCustomers( groupBy ) {
        let users;
        if ( !groupBy || groupBy == null ) {
            users = await this.models.User.findAll( { "where": { "isSeller": false } } );
        } else {
            users = await this.models.User.findAll( { "where": { "isSeller": false }, "group": [ groupBy, 'uuid' ], "attributes": { "exclude": [ 'hashedPassword', 'verifyCode', 'createdAt' ] } } );
        }
        return { "code": 200, "data": users };
    }
    async editUser( userId, name, phone, bday, familiarity, address, avatar, sellerDescription ) {
        let user_r = await this.models.User.findOne( { "where": { "uuid": userId }, "attributes": { "exclude": [ 'isSeller', 'hashedPassword', 'createdAt', 'verifyCode' ] } } );
        if ( !user_r ) {
            return { "code": 200, "data": { "status": false, "msg": "user_notfound" } };
        }
        let obj = {};
        if ( name ) {
            obj.name = name;
        }
        if ( address ) {
            obj.address = address;
        }
        if ( phone ) {
            obj.phone = phone;
            obj.status = false;
            let code = Math.floor( 1000 + Math.random() * 9000 );
            obj.verifyCode = code;
            // send SMS
            await this.kavenegar.VerifyLookup( { "receptor": phone, "token": code, "template": "verify-cafechi" } );
            console.log( `${userId } : ${ code}` );
        }
        if ( bday ) {
            obj.bday = Date.parse( bday );
        }
        if ( avatar ) {
            obj.image = avatar;
        }
        if ( sellerDescription && user_r.isSeller ) {
            obj.sellerDescription = sellerDescription;
        }
        if ( familiarity ) {
            obj.familiarity = familiarity;
        }
        await user_r.update( obj );
        return { "code": 200, "data": { "status": true } };
    }
}

module.exports = Logics;
