const Sequelize = require( 'sequelize' );
class Logics {
    constructor( models, Sequelize ) {
        this.models = models;
        this.Sequelize = Sequelize;
    }

    async get( seller, floor ) {
        let cond = { seller, "is_deleted": false };
        if ( floor ) {
            cond[ 'floor' ] = floor;
        }
        let table_r = await this.models.Tabel.findAll( { "where": cond, "attributes": { "exclude": [ 'seller', 'lockAt', 'createdAt', 'updatedAt', 'is_deleted' ] } } );
        return { "code": 200, "data": table_r };
    }
    async getByTiming( seller, timing, day ) {
        let timing_r = await this.models.Timing.findOne( { "where": { seller, "uuid": timing, "status": true, "is_deleted": false } } );
        if ( !timing_r ) {
            return { "code": 404, "data": { "status": false, "msg": 'timing_notfound' } };
        }
        const Op = Sequelize.Op;
        let reserve_r = await this.models.Reserve.findAll( { "where": { seller, "TimingUuid": timing, day, [ Op.or ]: [ { "status": 1 }, { "status": 0, "createdAt": { [ Op.gte ]: new Date( Date.now() - 900000 ) } } ] }, "attributes": [ 'TabelUuid' ], "raw": true } )
            .then( ( reserves ) => {
                return reserves.map( ( reserve ) => {
                    return reserve.TabelUuid;
                } );
            } );
        let table_r = await this.models.Tabel.findAll( { "where": { seller, "is_deleted": false, "uuid": { [ Op.notIn ]: reserve_r } }, "attributes": { "exclude": [ 'seller', ',is_deleted', 'createdAt', 'updatedAt', 'is_deleted' ] } } );
        return { "code": 200, "data": table_r };
    }
    async add( seller, name, floor, price, capacity ) {
        let table_r = await this.models.Tabel.create( { seller, name, floor, price, capacity } );
        return { "code": 200, "data": table_r };
    }
    async edit( seller, uuid, name, floor, price, capacity ) {
        let table_r = await this.models.Tabel.findOne( { "where": { uuid, seller, "is_deleted": false } } );
        if ( !table_r ) {
            return { "code": 404, "data": { "status": false, "msg": 'table_notfound' } };
        }
        await table_r.update( { name, floor, price, capacity } );
        return { "code": 200, "data": table_r };
    }
    async delete( seller, uuid ) {
        let table_r = await this.models.Tabel.findOne( { "where": { uuid, seller, "is_deleted": false } } );
        if ( !table_r ) {
            return { "code": 404, "data": { "status": false, "msg": 'table_notfound' } };
        }
        await table_r.update( { "is_deleted": true } );
        return { "code": 200, "data": table_r };
    }
}

module.exports = Logics;
