class Logics {
    constructor( models ) {
        this.models = models;
    }

    async get( user ) {
        let like_r = await this.models.Like.findAll( {
            "where": { user },
            "include": [ { "model": this.models.Product, "where": { "status": true }, "attributes": { "exclude": [ 'seller', 'status', 'createdAt', 'updatedAt' ] } } ]
        } );
        return { "code": 200, "data": like_r };
    }

    async like( user, product ) {
        let product_r = await this.models.Product.findOne( { "where": { "uuid": product } } );
        if ( !product_r ) {
            return { "code": 404, "data": { "status": false, "msg": "product_notfound" } };
        }
        let like_r = await this.models.Like.findOne( { "where": { user, "ProductUuid": product } } );
        if ( !like_r ) {
            await this.models.Like.create( { user, "ProductUuid": product } );
        } else {
            await this.models.Like.destroy( { "where": { user, "ProductUuid": product } } );
        }
        return { "code": 200, "data": { "status": true } };
    }
}

module.exports = Logics;
