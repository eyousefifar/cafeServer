const Sequelize = require( 'sequelize' );

module.exports = ( sequelize ) => {
    const Product = sequelize.define( "Products", {
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
            "allowNull": false
        },
        "desc": {
            "type": Sequelize.TEXT,
            "allowNull": true
        },
        "image": {
            "type": Sequelize.STRING,
            "allowNull": false,
            "defaultValue": ""
        },
        "status": {
            "type": Sequelize.BOOLEAN,
            "allowNull": false,
            "defaultValue": false
        },
        "price": {
            "type": Sequelize.INTEGER,
            "allowNull": false,
            "defaultValue": 1000
        },
        "CategoreUuid": {
            "type": Sequelize.UUID,
            "allowNull": false
        },
        "is_deleted": {
            "type": Sequelize.BOOLEAN,
            "defaultValue": false
        }
    }, { "freezeTableName": true } );
    return Product;
};
