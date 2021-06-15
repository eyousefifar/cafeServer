module.exports = ( sequelize ) => {
    const Product = require( './product' )( sequelize );
    const Category = require( './category' )( sequelize );
    const User = require( './user' )( sequelize );
    const Like = require( './like' )( sequelize );
    const Bookmark = require( './bookmark' )( sequelize );
    const Comment = require( './comment' )( sequelize );
    const Timing = require( './timing' )( sequelize );
    const Holiday = require( './holiday' )( sequelize );
    const Tabel = require( './tabel' )( sequelize );
    const Reserve = require( './reserve' )( sequelize );
    const ReserveItem = require( './reserveItem' )( sequelize );
    const Discount = require( './discount' )( sequelize );
    
    Category.hasMany( Product, { "foreignKey": 'CategoreUuid' } );
    Product.belongsTo( Category, { "foreignKey": 'CategoreUuid' } );

    Product.hasMany( Like, { "foreignKey": 'ProductUuid' } );
    Like.belongsTo( Product, { "foreignKey": 'ProductUuid' } );

    Product.hasMany( Bookmark, { "foreignKey": 'ProductUuid' } );
    Bookmark.belongsTo( Product, { "foreignKey": 'ProductUuid' } );

    User.hasMany( Comment, { "foreignKey": 'UserUuid' } );
    Comment.belongsTo( User, { "foreignKey": 'UserUuid' } );

    User.hasMany( Reserve, { "foreignKey": 'UserUuid' } );
    Reserve.belongsTo( User, { "foreignKey": 'UserUuid' } );
    
    Tabel.hasMany( Reserve, { "foreignKey": 'TabelUuid' } );
    Reserve.belongsTo( Tabel, { "foreignKey": 'TabelUuid' } );

    Timing.hasMany( Reserve, { "foreignKey": 'TimingUuid' } );
    Reserve.belongsTo( Timing, { "foreignKey": 'TimingUuid' } );
    
    Reserve.hasMany( ReserveItem, { "foreignKey": 'ReserveUuid' } );
    ReserveItem.belongsTo( Reserve, { "foreignKey": 'ReserveUuid' } );

    Product.hasMany( ReserveItem, { "foreignKey": 'ProductUuid' } );
    ReserveItem.belongsTo( Product, { "foreignKey": 'ProductUuid' } );

    const init = async() => {
        await User.sync( {} );
        await Category.sync( {} );
        await Holiday.sync( {} );
        await Tabel.sync( {} );
        await Timing.sync( {} );
        await Product.sync( {} );
        await Like.sync( {} );
        await Bookmark.sync( {} );
        await Comment.sync( {} );
        await Reserve.sync( {} );
        await ReserveItem.sync( {} );
        await Discount.sync( {} );
    };
    
    init().catch( err => console.log( err ) );

    return {
        "Product": Product,
        "Like": Like,
        "Category": Category,
        "Bookmark": Bookmark,
        "Comment": Comment,
        "Timing": Timing,
        "Holiday": Holiday,
        "User": User,
        "Tabel": Tabel,
        "Reserve": Reserve,
        "ReserveItem": ReserveItem,
        "Discount": Discount
    };
};
