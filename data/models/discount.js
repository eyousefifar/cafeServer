const Sequalize = require( 'sequelize' );

module.exports = ( sequalize ) => {
    const Discount = sequalize.define( "Discounts", {
        "uuid": {
            "type": Sequalize.UUID,
            "primaryKey": true,
            "defaultValue": Sequalize.UUIDV4
        },
        "templateType": {
            "type": Sequalize.ENUM,
            "values": [ 'registerUser', 'normal' ]
        },
        "code": {
            "type": Sequalize.STRING,
            "unique": true
        },
        "percentage": {
            "type": Sequalize.INTEGER,
            "allowNull": false,
            "defalutValue": 5
        },
        "maxValue": {
            "type": Sequalize.INTEGER,
            "allowNull": true
        },
        "expDate": {
            "type": Sequalize.DATE,
            "allowNull": false
        },
        "seller": {
            "type": Sequalize.UUID
        },
        "is_deleted": {
            "type": Sequalize.BOOLEAN,
            "defaultValue": false
        }
    }, { "freezeTableName": true } );
    return Discount;
};
