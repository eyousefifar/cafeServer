const Sequelize = require( 'sequelize' );
module.exports = ( sequelize ) => {
    const Tabel = sequelize.define( "Tabels", {
        "uuid": {
            "type": Sequelize.UUID,
            "primaryKey": true,
            "defaultValue": Sequelize.UUIDV4
        },
        "seller": {
            "type": Sequelize.UUID
        },
        "name": {
            "type": Sequelize.STRING,
            "defaultValue": "میز ۱"
        },
        "floor": {
            "type": Sequelize.INTEGER,
            "defaultValue": 0
        },
        "capacity": {
            "type": Sequelize.INTEGER,
            "defaultValue": 1
        },
        "price": {
            "type": Sequelize.INTEGER,
            "defaultValue": 0
        },
        "is_deleted": {
            "type": Sequelize.BOOLEAN,
            "defaultValue": false
        }
    }, { "freezeTableName": true } );
    return Tabel;
};
