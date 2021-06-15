const Sequelize = require( 'sequelize' );
module.exports = ( sequelize ) => {
    const Reserve = sequelize.define( "Reserves", {
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
        "day": {
            "type": Sequelize.DATEONLY
        },
        "TimingUuid": {
            "type": Sequelize.UUID
        },
        "TabelUuid": {
            "type": Sequelize.UUID
        },
        "totalPrice": {
            "type": Sequelize.INTEGER
        },
        "paymode": {
            // 0 -> online   | 1 -> catch
            "type": Sequelize.INTEGER,
            "defaultValue": 0
        },
        "status": {
            // 0 -> notPaied   | 1 -> Paied
            "type": Sequelize.INTEGER,
            "defaultValue": 0
        }
    }, { "freezeTableName": true } );
    return Reserve;
};
