const Sequelize = require( 'sequelize' );
module.exports = ( sequelize ) => {
    const Holiday = sequelize.define( "Holidays", {
        "uuid": {
            "type": Sequelize.UUID,
            "primaryKey": true,
            "defaultValue": Sequelize.UUIDV4
        },
        "seller": {
            "type": Sequelize.UUID
        },
        "day": {
            "type": Sequelize.DATEONLY
        },
        "is_deleted": {
            "type": Sequelize.BOOLEAN,
            "defaultValue": false
        }
    }, { "freezeTableName": true } );
    return Holiday;
};
