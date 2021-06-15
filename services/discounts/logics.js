class Logics {
    constructor( models, jwt, kavenegar ) {
        this.models = models;
        this.jwt = jwt;
        this.kavenegar = kavenegar;
    }
    async getDiscount( sellerUUID, discountUUID ) {
        let condition = { "seller": sellerUUID, "uuid": discountUUID, "is_deleted": false };
        let discount = await this.models.Discount.findOne( {
            "where": condition
        } );
        if ( !discount ) {
            return { "code": 404, "status": false, "msg": "discount_notfound" };
        }
        return { "code": 200, "data": discount };
    }
    async getAllDiscounts( sellerUUID ) {
        let condition = { "seller": sellerUUID, "is_deleted": false };
        let discounts;
        discounts = await this.models.Discount.findAll( { "where": condition } );
        return { "code": 200, "data": discounts };
    }
    async createDiscount( sellerUUID, code, percentage, expDate, maxValue, templateType ) {
        if ( !code ) {
            code = '';
            let Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
            let length = Characters.length;
            let i;
            for ( i = 0; i < 15; i++ ) {	// length of the code is 15
                code += Characters.charAt( Math.floor( Math.random() * length ) );
            }
        }
        let discount = await this.models.Discount.create( { code, percentage, expDate, maxValue, templateType, "seller": sellerUUID } );
        return { "code": 200, "data": discount };
    }
    async editDiscount( sellerUUID, discountUUID, code, percentage, expDate, maxValue, templateType ) {
        let discountObject = {};
        if ( code ) {
            discountObject.code = code;
        }
        if ( percentage ) {
            discountObject.percentage = percentage;
        }
        if ( expDate ) {
            discountObject.expDate = expDate;
        }
        if ( maxValue ) {
            discountObject.maxValue = maxValue;
        }
        if ( templateType ) {
            discountObject.templateType = templateType;
        }
        let discount = await this.models.Discount.findOne( { "where": { "uuid": discountUUID, "seller": sellerUUID, "is_deleted": false } } );
        if ( !discount ) {
            return { "code": 404, "data": { "status": false, "msg": "discount_notfound" } };
        }
        await discount.update( discountObject );
        return { "code": 200, "data": discount };
    }
    async deleteDiscount( sellerUUID, discountUUID ) {
        let discount = await this.models.Discount.findOne( { "where": { "uuid": discountUUID, "seller": sellerUUID, "is_deleted": false } } );
        if ( !discount ) {
            return { "code": 404, "data": { "status": false, "msg": "discount_notfound" } };
        }
        await discount.update( { "is_deleted": true } );
        return { "code": 200, "data": { "status": discount } };
    }
    async validateDiscount( discount ) {
        let currentDate = new Date();
        if ( discount.expDate < currentDate ) {
            return false;
        }
        return true;
    }
    async validateDiscountByCode( discountCode ) {
        let currentDate = new Date();
        let discount = await this.models.Discount.findOne( {
            "where": {
                "code": discountCode
            }
        } );
        if ( !discount ) {
            return { "code": 404, "data": { "status": false, "msg": "discount_notfound" } };
        } else if ( discount.expDate < currentDate ) {
            return { "code": 400, "data": { "status": false, "msg": "discount_notvalid" } };
        }
        return { "code": 200, "data": discount.percentage };
    }
    async getUserDiscount() {
        let discountObj = await this.models.Discount.findOne( {
            "where": {
                "templateType": "registerUser"
            }
        } );
        if ( discountObj ) {
            let discountValidate = await this.validateDiscount( discountObj );
            if ( discountValidate ) {
                return { "code": 200, "data": discountObj.code };
            }
        }
        return { "code": 404, "data": null };
    }
}

module.exports = Logics;
