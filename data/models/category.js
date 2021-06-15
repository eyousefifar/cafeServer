const Sequelize = require( 'sequelize' );
module.exports = ( sequelize ) => {
    const Category = sequelize.define( "Categores", {
        "uuid": {
            "type": Sequelize.UUID,
            "primaryKey": true,
            "defaultValue": Sequelize.UUIDV4
        },
        "seller": {
            "type": Sequelize.UUID
        },
        "name": {
            "type": Sequelize.STRING
        },
        "desc": {
            "type": Sequelize.STRING
        },
        "image": {
            "type": Sequelize.STRING
        },
        "is_deleted": {
            "type": Sequelize.BOOLEAN,
            "defaultValue": false
        }
    }, { "freezeTableName": true } );
    return Category;
};
