class Logics {
    constructor( models, sequelize ) {
        this.models = models;
        this.sequelize = sequelize;
    }

    async get( seller ) {
        let category_r = await this.models.Category.findAll( { "where": { seller, "is_deleted": false }, "attributes": { "exclude": [ 'is_deleted', 'createdAt', 'updatedAt', 'seller' ] } } );
        return { "code": 200, "data": category_r };
    }

    async add( seller, name, desc, image ) {
        let category_r = await this.models.Category.create( { seller, name, desc, image } );
        return { "code": 200, "data": category_r };
    }

    async edit( uuid, seller, name, desc, image ) {
        let category_r = await this.models.Category.findOne( { "where": { uuid, seller, "is_deleted": false } } );
        if ( !category_r ) {
            return { "code": 404, "data": { "status": true, "msg": "category_notfound" } };
        }
        let obj = {};
        if ( name ) {
            obj.name = name;
        }
        if ( desc ) {
            obj.desc = desc;
        }
        if ( image ) {
            obj.image = image;
        }
        category_r.update( obj );
        return { "code": 200, "data": { "status": true, "data": category_r } };
    }

    async delete( seller, uuid ) {
        let category_r = await this.models.Category.findOne( { "where": { uuid, seller } } );
        if ( !category_r ) {
            return { "code": 404, "data": { "status": true, "msg": "category_notfound" } };
        }
        category_r.update( { "is_deleted": true } );
        return { "code": 200, "data": { "status": true, "data": category_r } };
    }
}

module.exports = Logics;
