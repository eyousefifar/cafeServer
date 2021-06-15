const Sequelize = require( 'sequelize' );
class Logics {
    constructor( models, sequelize ) {
        this.models = models;
        this.sequelize = sequelize;
    }

    async findProduct( seller, user, category, search, ismy ) {
        let cond = { seller, "is_deleted": false };
        if ( !ismy ) {
            cond[ 'status' ] = true;
        }
        if ( category ) {
            let category_r = await this.models.Category.findOne( { "where": { "uuid": category, "is_deleted": false } } );
            if ( !category_r ) {
                return { "code": 404, "data": { "status": false, "msg": 'category_notfound' } };
            }
            cond.CategoreUuid = category;
        }
        if ( search ) {
            const Op = Sequelize.Op;
            cond[ 'name' ] = { [ Op.like ]: `%${ search }%` };
        }
        let product_r = await this.models.Product.findAll( {
            "where": cond,
            "group": [ 'Products.uuid', 'Categore.uuid' ],
            "attributes": {
                "exclude": [ 'CategoreUuid', 'createdAt', 'updatedAt', 'seller', 'is_deleted' ],
                "include": [
                    [ this.sequelize.literal( `(SELECT COUNT("Likes"."uuid") FROM "Likes" WHERE "Likes"."ProductUuid" = "Products"."uuid" AND "Likes"."user" = '${ user }')` ), 'isLiked' ],
                    [ this.sequelize.fn( "COUNT", this.sequelize.col( "Likes.uuid" ) ), "like" ]
                ]
            },
            "include": [
                { "model": this.models.Like, "attributes": [] },
                { "model": this.models.Category, "attributes": [ 'uuid', 'name', 'desc', 'image' ] }
            ]
        } );
        return { "code": 200, "data": { "status": true, "data": product_r } };
    }
    async getProduct( uuid, isSeller ) {
        let cond = { uuid, "is_deleted": false };
        if ( !isSeller ) {
            cond[ 'status' ] = true;
        }
        let product_r = await this.models.Product.findOne( {
            "where": cond,
            "group": [ 'Products.uuid', 'Categore.uuid' ],
            "attributes": {
                "exclude": [ 'CategoreUuid', 'createdAt', 'updatedAt', 'seller', 'is_deleted' ],
                "include": [ [ this.sequelize.fn( "COUNT", this.sequelize.col( "Likes.uuid" ) ), "like" ] ]
            },
            "include": [ { "model": this.models.Like, "attributes": [] }, { "model": this.models.Category, "attributes": [ 'uuid', 'name', 'desc', 'image' ] } ]
        } );
        return { "code": 200, "data": product_r };
    }
    async addProduct( seller, name, desc, price, category, image ) {
        let category_r = await this.models.Category.findOne( { "where": { "uuid": category, seller, "is_deleted": false } } );
        if ( !category_r ) {
            return { "code": 404, "data": { "status": false, "msg": "category_notfound" } };
        }

        let product_r = await this.models.Product.create( { seller, name, desc, image, price, "CategoreUuid": category, image } );
        return { "code": 200, "data": product_r };
    }
    async editProduct( seller, uuid, name, desc, price, category, image ) {
        let obj = {};
        if ( name ) {
            obj.name = name;
        }
        if ( desc ) {
            obj.desc = desc;
        }
        if ( price ) {
            obj.price = price;
        }
        if ( image ) {
            obj.image = image;
        }
        if ( category ) {
            let category_r = await this.models.Category.findOne( { "where": { "uuid": category, seller, "is_deleted": false } } );
            if ( !category_r ) {
                return { "code": 404, "data": { "status": false, "msg": "category_notfound" } };
            }
            obj.CategoreUuid = category;
        }
        let product_r = await this.models.Product.findOne( { "where": { uuid, seller, "is_deleted": false }, "returning": true, "plain": true } );
        if ( !product_r ) {
            return { "code": 404, "data": { "status": false, "msg": "product_notfound" } };
        }
        await product_r.update( obj );
        return { "code": 200, "data": { "status": product_r } };
    }
    async deleteProduct( seller, uuid ) {
        let product_r = await this.models.Product.findOne( { "where": { uuid, seller, "is_deleted": false }, "returning": true, "plain": true } );
        if ( !product_r ) {
            return { "code": 404, "data": { "status": false, "msg": "product_notfound" } };
        }
        await product_r.update( { "is_deleted": true } );
        return { "code": 200, "data": { "status": product_r } };
    }
    async statusToggle( seller, uuid, status ) {
        let product_r = await this.models.Product.findOne( { "where": { uuid, seller, "is_deleted": false }, "returning": true, "plain": true } );
        if ( !product_r ) {
            return { "code": 404, "data": { "status": false, "msg": "product_notfound" } };
        }
        product_r.update( { "status": status } );
        return { "code": 200, "data": { "status": product_r } };
    }
}

module.exports = Logics;
