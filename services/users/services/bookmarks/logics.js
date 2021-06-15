class Logics {
    constructor( models ) {
        this.models = models;
    }

    async get( user ) {
        let bookmark_r = await this.models.Bookmark.findAll( {
            "where": { user },
            "include": [ { "model": this.models.Product, "where": { "status": true }, "attributes": { "exclude": [ 'seller', 'status', 'createdAt', 'updatedAt' ] } } ]
        } );
        return { "code": 200, "data": bookmark_r };
    }
    async check( user, product ) {
        // check product
        let product_r = await this.models.Product.count( { "where": { "uuid": product, "status": true } } );
        if ( product_r <= 0 ) {
            return false;
        }
        let bookmark_r = await this.models.Bookmark.findOne( { "where": { user, "ProductUuid": product } } );
        if ( !bookmark_r ) {
            await this.models.Bookmark.create( { user, "ProductUuid": product } );
        } else {
            await this.models.Bookmark.destroy( { "where": { user, "ProductUuid": product } } );
        }
        return { "code": 200, "data": { "status": true } };
    }
}

module.exports = Logics;
