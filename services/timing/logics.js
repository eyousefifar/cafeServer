class Logics {
    constructor( models ) {
        this.models = models;
    }
    async get( seller, isSeller ) {
        let cond = { seller, "is_deleted": false };
        if ( !isSeller ) {
            cond[ 'status' ] = true;
        }
        let timing_r = await this.models.Timing.findAll( { "where": cond, "order": [ [ 'at', 'ASC' ] ], "attributes": { "exclude": [ 'seller', 'is_deleted', 'createdAt', 'updatedAt' ] } } );
        return { "code": 200, "data": timing_r };
    }
    async add( seller, at ) {
        let timing_t = await this.models.Timing.findOne( { "where": { seller, at, "is_deleted": false } } );
        if ( timing_t ) {
            return { "code": 409, "data": { "status": false, "msg": 'duplicate' } };
        }
        let timing_r = await this.models.Timing.create( { seller, at, "status": false } );
        return { "code": 200, "data": timing_r };
    }
    async statusToggle( uuid, seller, status ) {
        let timing_r = await this.models.Timing.findOne( { "where": { uuid, seller, "is_deleted": false } } );
        if ( !timing_r ) {
            return { "code": 404, "data": { "status": false, "msg": 'timing_notfound' } };
        }
        await timing_r.update( { status } );
        return { "code": 200, "data": { "status": true } };
    }
    async delete( uuid, seller ) {
        let timing_r = await this.models.Timing.findOne( { "where": { uuid, seller, "is_deleted": false } } );
        if ( !timing_r ) {
            return { "code": 404, "data": { "status": false, "msg": 'timing_notfound' } };
        }
        await timing_r.update( { "is_deleted": true } );
        return { "code": 200, "data": { "status": true } };
    }
}

module.exports = Logics;
