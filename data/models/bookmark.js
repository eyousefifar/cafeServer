const Sequelize = require( 'sequelize' );
module.exports = ( sequelize ) => {
    const Bookmark = sequelize.define( "Bookmarks", {
        "uuid": {
            "type": Sequelize.UUID,
            "primaryKey": true,
            "defaultValue": Sequelize.UUIDV4
        },
        "user": {
            "type": Sequelize.UUID
        },
        "ProductUuid": {
            "type": Sequelize.UUID
        }
    }, { "freezeTableName": true } );
    return Bookmark;
};
