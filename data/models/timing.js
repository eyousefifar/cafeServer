const Sequelize = require( 'sequelize' );
module.exports = ( sequelize ) => {
    const Timing = sequelize.define( "Timings", {
        "uuid": {
            "type": Sequelize.UUID,
            "primaryKey": true,
            "defaultValue": Sequelize.UUIDV4
        },
        "seller": {
            "type": Sequelize.UUID
        },
        "status": {
            "type": Sequelize.BOOLEAN
        },
        "at": {
            "type": Sequelize.INTEGER
        },
        "is_deleted": {
            "type": Sequelize.BOOLEAN,
            "defaultValue": false
        }
    }, { "freezeTableName": true } );
    return Timing;
};
