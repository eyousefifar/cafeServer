class Logics {
    constructor( models, sequelize ) {
        this.models = models;
        this.sequelize = sequelize;
    }

    async get( seller, skip = 0, limit = 10 ) {
        let seller_r = await this.models.User.findOne( { "where": { "uuid": seller, "isSeller": true } } );
        if ( !seller_r ) {
            return { "code": 404, "data": { "status": false, "msg": "seller_notfound" } };
        }
        let comment_a = await this.models.Comment.findAll( {
            "where": { seller, "accepted": true, "is_deleted": false }, "attributes": [
                [ this.sequelize.fn( 'AVG', this.sequelize.col( 'cleaning' ) ), 'cleaning' ],
                [ this.sequelize.fn( 'AVG', this.sequelize.col( 'environment' ) ), 'environment' ],
                [ this.sequelize.fn( 'AVG', this.sequelize.col( 'quality' ) ), 'quality' ],
                [ this.sequelize.fn( 'AVG', this.sequelize.col( 'deal' ) ), 'deal' ]
            ]
        } );
        let comment_r = await this.models.Comment.findAll( {
            "where": { seller, "accepted": true, "is_deleted": false }, "include": [ { "model": this.models.User, "attributes": [ 'name', 'phone', 'image' ] } ],
            skip, limit
        } );
        return { "code": 200, "data": { "status": true, "info": comment_a, "list": comment_r } };
    }

    async getNotAccepted( seller, skip = 0, limit = 10 ) {
        let seller_r = await this.models.User.findOne( { "where": { "uuid": seller, "isSeller": true } } );
        if ( !seller_r ) {
            return { "code": 404, "data": { "status": false, "msg": "seller_notfound" } };
        }
        let comment_r = await this.models.Comment.findAll( {
            "where": { seller, "accepted": false, "is_deleted": false }, "include": [ { "model": this.models.User, "attributes": [ 'name', 'phone', 'image' ] } ],
            skip, limit
        } );
        return { "code": 200, "data": { "status": true, "list": comment_r } };
    }

    async accept( seller, uuid ) {
        let seller_r = await this.models.User.findOne( { "where": { "uuid": seller, "isSeller": true } } );
        if ( !seller_r ) {
            return { "code": 404, "data": { "status": false, "msg": "seller_notfound" } };
        }
        let comment_r = await this.models.Comment.findOne( { "where": { uuid, seller, "accepted": false, "is_deleted": false } } );
        if ( !comment_r ) {
            return { "code": 404, "data": { "status": false, "msg": "comment_notfound" } };
        }
        await comment_r.update( { "accepted": true } );
        return { "code": 200, "data": { "status": true } };
    }

    async submit( seller, user, text, cleaning, environment, quality, deal ) {
        let seller_r = await this.models.User.findOne( { "where": { "uuid": seller, "isSeller": true } } );
        if ( !seller_r ) {
            return { "code": 404, "data": { "status": false, "msg": "seller_notfound" } };
        }
        let comment_r = await this.models.Comment.findOne( { "where": { seller, "UserUuid": user, "is_deleted": false } } );
        if ( !comment_r ) {
            comment_r = await this.models.Comment.create( { seller, "UserUuid": user, text, cleaning, environment, quality, deal } );
        } else {
            comment_r = await comment_r.update( { text, cleaning, environment, quality, deal, "accepted": false } );
        }
        return { "code": 200, "data": { "status": true, "data": comment_r } };
    }

    async delete( seller, commentUUID ) {
        let seller_r = await this.models.User.findOne( { "where": { "uuid": seller, "isSeller": true } } );
        if ( !seller_r ) {
            return { "code": 404, "data": { "status": false, "msg": "seller_notfound" } };
        }
        let comment_r = await this.models.Comment.findOne( { "where": { "uuid": commentUUID } } );
        if ( !comment_r ) {
            return { "code": 404, "data": { "status": false, "msg": "comment_notfound" } };
        }
        comment_r = await comment_r.update( { "is_deleted": true } );
        return { "code": 200, "data": { "status": true, "data": comment_r } };
    }
}

module.exports = Logics;
