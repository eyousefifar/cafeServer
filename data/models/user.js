const Sequelize = require( 'sequelize' );
module.exports = ( sequelize ) => {
    const User = sequelize.define( "Users", {
        "uuid": {
            "type": Sequelize.UUID,
            "primaryKey": true,
            "defaultValue": Sequelize.UUIDV4
        },
        "name": {
            "type": Sequelize.STRING,
            "allowNull": false,
            "unique": true,
            "defaultValue": "کاربر جدید"
        },
        "bday": {
            "type": Sequelize.DATE,
            "allowNull": true
        },
        "phone": {
            "type": Sequelize.STRING,
            "allowNull": false,
            "unique": true
        },
        "address": {
            "type": Sequelize.STRING,
            "allowNull": true
        },
        "familiarity": {
            "type": Sequelize.TEXT,
            "allowNull": true
        },
        "sellerDescription": {
            "type": Sequelize.TEXT,
            "allowNull": true
        },
        "isSeller": {
            "type": Sequelize.BOOLEAN,
            "allowNull": true,
            "defaultValue": false
        },
        "verifyCode": {
            "type": Sequelize.INTEGER,
            "allowNull": true,
            "defaultValue": 0
        },
        "image": {
            "type": Sequelize.STRING,
            "allowNull": false,
            "defaultValue": ""
        },
        "hashedPassword": {
            "type": Sequelize.STRING,
            "allowNull": true
        }
    }, { "freezeTableName": true } );
    return User;
};
