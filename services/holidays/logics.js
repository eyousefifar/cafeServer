class Logics {
    constructor( models, sequelize ) {
        this.models = models;
        this.sequelize = sequelize;
    }

    async get( seller ) {
        let holiday_r = await this.models.Holiday.findAll( {
            "where": { seller, "is_deleted": false }, "attributes": { "exclude": [ 'is_deleted', 'updatedAt', 'createdAt', 'seller' ] }
        } );
        return holiday_r;
    }

    async add( seller, day ) {
        try {
            day = Date.parse( day );
        } catch ( e ) {
            return { "code": 400, "data": { "status": false, "msg": "invalid_date" } };
        }
        let holiday_t = await this.models.Holiday.count( { "where": { seller, day } } );
        if ( holiday_t ) {
            return { "code": 409, "data": { "status": false, "msg": "duplicate" } };
        }
        let holiday_r = await this.models.Holiday.create( { seller, day } );
        return { "code": 200, "data": holiday_r };
    }

    async delete( seller, uuid ) {
        let holiday_r = await this.models.Holiday.findOne( { "where": { uuid, seller, "is_deleted": false } } );
        if ( !holiday_r ) {
            return { "code": 404, "data": { "status": false, "msg": "holiday_notfound" } };
        }
        await holiday_r.update( { "is_deleted": true } );
        return holiday_r;
    }
}

module.exports = Logics;
