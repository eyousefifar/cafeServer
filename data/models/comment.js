const Sequelize = require( 'sequelize' );
module.exports = ( sequelize ) => {
    const Comment = sequelize.define( "Comments", {
        "uuid": {
            "type": Sequelize.UUID,
            "primaryKey": true,
            "defaultValue": Sequelize.UUIDV4
        },
        "seller": {
            "type": Sequelize.UUID
        },
        "UserUuid": {
            "type": Sequelize.UUID
        },
        "text": {
            "type": Sequelize.STRING
        },
        "cleaning": {
            "type": Sequelize.INTEGER
        },
        "environment": {
            "type": Sequelize.INTEGER
        },
        "quality": {
            "type": Sequelize.INTEGER
        },
        "deal": {
            "type": Sequelize.INTEGER
        },
        "accepted": {
            "type": Sequelize.BOOLEAN,
            "defaultValue": false
        },
        "is_deleted": {
            "type": Sequelize.BOOLEAN,
            "defaultValue": false
        }
    }, { "freezeTableName": true } );
    return Comment;
};
