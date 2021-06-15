const Sequelize = require( 'sequelize' );
module.exports = ( sequelize ) => {
    const ReserveItem = sequelize.define( "ReserveItems", {
        "uuid": {
            "type": Sequelize.UUID,
            "primaryKey": true,
            "defaultValue": Sequelize.UUIDV4
        },
        "seller": {
            "type": Sequelize.UUID
        },
        "ReserveUuid": {
            "type": Sequelize.UUID
        },
        "user": {
            "type": Sequelize.UUID
        },
        "ProductUuid": {
            "type": Sequelize.UUID
        },
        "count": {
            "type": Sequelize.INTEGER,
            "defaultValue": 1
        },
        "price": {
            "type": Sequelize.INTEGER
        }
    }, { "freezeTableName": true } );
    return ReserveItem;
};
