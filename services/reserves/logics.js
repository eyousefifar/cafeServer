const Sequelize = require( "sequelize" );
const axios = new require( "axios" );

class PayPingStrategy {
    constructor( apiKey, sendEndPoint, verifyEndPoint, gateway ) {
        this.apiKey = apiKey;
        this.sendEndPoint = sendEndPoint;
        this.verifyEndPoint = verifyEndPoint;
        this.gateway = gateway;
    }
    async send( amount, callbackUrl, clientRefId, { payerIdentity = null, payerName = null, description = null } ) {
        try {
            const { data } = await axios( {
                "method": "POST",
                "url": this.sendEndPoint,
                "headers": { 'Authorization': `Bearer ${this.apiKey}` },
                "data": {
                    "amount": amount,
                    "payerIdentity": payerIdentity,
                    "payerName": payerName,
                    "description": description,
                    "returnUrl": callbackUrl,
                    "clientRefId": clientRefId
                }
            } );

            return { "paymentToken": data.code, "paymentLink": `${this.gateway}${data.code}` };
        } catch ( error ) {
            throw new Error( "مشکلی در پرداخت وجود دارد" );
        }
    }
    async verify( amount, refId ) {
        try {
            await axios( {
                "method": "POST",
                "url": this.verifyEndPoint,
                "headers": { 'Authorization': `Bearer ${this.apiKey}` },
                "data": {
                    "amount": amount,
                    "refId": refId
                }
            } );
        } catch ( error ) {
            console.log( error );
            throw new Error( "مشکلی در پرداخت وجود دارد" );
        }
    }
}
const payping = new PayPingStrategy( process.env.PAYPING_APIKEY, process.env.PAYPING_SEND_ENDPOINT, process.env.PAYPING_VERIFY_ENDPOINT, process.env.PAYPING_GATEWAY_ENDPOINT );

class Logics {
    constructor( models, sequelize, kavenegar, discountService ) {
        this.models = models;
        this.sequelize = sequelize;
        this.kavenegar = kavenegar;
        this.discountService = discountService;
    }

    async orders( seller, skip = 0, limit = 20, from = new Date().setHours( 0, 0, 0, 0 ), to = new Date().setMonth( new Date().getMonth() + 1 ) ) {
        try {
            if ( typeof from === 'string' ) {
                from = Date.parse( from );
            }
            if ( typeof to === 'string' ) {
                to = Date.parse( to );
            }
        } catch ( e ) {
            return { "code": 400, "data": { "status": false, "msg": "invalid_date" } };
        }
        const Op = Sequelize.Op;
        let reserve_r = await this.models.Reserve.findAll( {
            "where": { seller, "status": 1, "day": { [ Op.between ]: [ from, to ] } },
            skip,
            limit,
            "attributes": { "exclude": [ "seller", "status" ] },
            "include": [ { "model": this.models.Tabel }, { "model": this.models.Timing }, { "model": this.models.User }, { "model": this.models.ReserveItem, "include": [ { "model": this.models.Product } ] } ],
            "order": [ [ this.models.Timing, 'at', 'ASC' ], [ 'day', 'ASC' ] ]
        } );
        return { "code": 200, "data": reserve_r };
    }
    async detail( seller, uuid ) {
        let reserve_r = await this.models.Reserve.findOne( {
            "where": { uuid, seller },
            "attributes": { "exclude": [ "seller", "status", "TabelUuid", "TimingUuid" ] },
            "include": [
                { "model": this.models.Tabel, "attributes": [ "floor", "capacity" ] },
                { "model": this.models.Timing, "attributes": [ "at" ] }
            ]
        } );
        let reserveitem_r = await this.models.ReserveItem.findAll( {
            "where": { "ReserveUuid": uuid, seller },
            "attributes": {
                "exclude": [
                    "seller",
                    "reserve",
                    "user",
                    "ProductUuid",
                    "createdAt",
                    "updatedAt"
                ]
            },
            "include": [
                {
                    "model": this.models.Product,
                    "attributes": [ "uuid", "name", "desc", "image", "price", "CategoreUuid" ]
                }
            ]
        } );
        return { "code": 200, "data": { "info": reserve_r, "list": reserveitem_r } };
    }
    async getBasket( user ) {
        // find that not poid
        let reserveItem_r = await this.models.ReserveItem.findAll( {
            "where": { user, "ReserveUuid": null },
            "include": [ { "model": this.models.Product, "where": { "status": true } } ],
            "attributes": {
                "exclude": [ "seller", "ProductUuid", "user", "createdAt", "updatedAt", "ReserveUuid" ]
            }
        } );
        return { "code": 200, "data": reserveItem_r };
    }
    async pushBasket( user, product, count ) {
        let product_r = await this.models.Product.findOne( {
            "where": { "uuid": product }
        } );
        if ( !product_r ) {
            return { "code": 404, "data": { "status": false, "msg": "product_notfound" } };
        }
        let seller = product_r.seller;
        let price = count * product_r.price;
        let reserveItem_r = await this.models.ReserveItem.findOne( {
            "where": { "ProductUuid": product, seller, user, "ReserveUuid": null }
        } );
        if ( reserveItem_r ) {
            reserveItem_r = await reserveItem_r.update( { price, count } );
        } else {
            reserveItem_r = await this.models.ReserveItem.create( {
                seller,
                price,
                user,
                "ProductUuid": product,
                count
            } );
        }
        return { "code": 200, "data": reserveItem_r };
    }
    async popBasket( user, product ) {
        let reserveItem_r = await this.models.ReserveItem.findOne( {
            "where": { user, "ProductUuid": product, "ReserveUuid": null }
        } );
        if ( !reserveItem_r ) {
            return {
                "code": 404,
                "data": { "status": false, "msg": "reserveitem_notfound" }
            };
        }
        reserveItem_r.destroy();
        return { "code": 200, "data": { "status": true } };
    }
    async pay( user, seller, tabel, day, at, discountCode = null ) {
        try {
            day = Date.parse( day );
        } catch ( e ) {
            return { "code": 400, "data": { "status": false, "msg": "invalid_date" } };
        }
        if ( day === NaN ) {
            return { "code": 401, "data": { "status": false } };
        }
        const Op = Sequelize.Op;
        let transaction = await this.sequelize.transaction();
        try {
            // check for duplicate
            let reserve_t = await this.models.Reserve.count( {
                "where": {
                    "UserUuid": user,
                    seller,
                    "TabelUuid": tabel,
                    day,
                    "TimingUuid": at,
                    [ Op.or ]: [
                        { "status": 1 },
                        { "status": 0, "createdAt": { [ Op.gte ]: new Date( Date.now() - 900000 ) } }
                    ]
                },
                transaction
            } );
            console.log( reserve_t );
            if ( reserve_t > 0 ) {
                return { "code": 409, "data": { "status": false, "msg": "was_reserved" } };
            }

            // find tabel
            let tabel_r = await this.models.Tabel.findOne( {
                "where": { "uuid": tabel },
                transaction
            } );
            if ( !tabel_r ) {
                return { "code": 404, "data": { "status": false, "msg": "tabel_notfound" } };
            }

            console.log( "find tabel" );

            // find time
            let timing_r = await this.models.Timing.findOne( {
                "where": { "uuid": at },
                transaction
            } );
            if ( !timing_r ) {
                return { "code": 404, "data": { "status": false, "msg": "timing_notfound" } };
            }

            console.log( "find time" );

            let totalPrice = await this.models.ReserveItem.sum( "price", {
                "where": { user, seller, "ReserveUuid": null }
            } );
            if ( isNaN( totalPrice ) ) {
                totalPrice = 0;
            }
            totalPrice += tabel_r.price;
            console.log( "total price", totalPrice );
            if ( discountCode ) {
                let discountObj = await this.models.Discount.findOne( {
                    "where": {
                        "code": discountCode
                    }
                } );
                if ( !discountObj ) {
                    return { "code": 404, "data": { "status": false, "msg": "discountCode_notfount" } };
                }
                let discountValidate = await this.discountService.validateDiscount( discountObj );
                if ( !discountValidate ) {
                    return { "code": 404, "data": { "status": false, "msg": "discount_expired" } };
                }
                totalPrice = totalPrice - ( ( discountObj.percentage / 100 ) * totalPrice );
            }
            
            // create reserve
            let reserve_r = await this.models.Reserve.create(
                {
                    "UserUuid": user,
                    seller,
                    day,
                    "TimingUuid": timing_r.uuid,
                    totalPrice,
                    "TabelUuid": tabel_r.uuid
                },
                { transaction }
            );
            console.log( "reserve" );

            await transaction.commit();
            let link;
            if ( totalPrice >= 1000 ) {
                try {
                    link = ( await payping.send(
                        totalPrice,
                        `${process.env.CLIENT_ENDPOINT}/reserves/verify`,
                        reserve_r.uuid,
                        {}
                    ) ).paymentLink;
                    return {
                        "code": 200,
                        "data": {
                            "status": true,
                            "data": {
                                "data": reserve_r,
                                "link": link
                            }
                        }
                    };
                } catch ( error ) {
                    return {
                        "code": 400,
                        "data": {
                            "status": false,
                            "data": {
                                "message": error.message
                            }
                        }
                    };
                }
            } else {
                await reserve_r.update( { "status": 1, "paymode": 1 } );
                return {
                    "code": 200,
                    "data": {
                        "status": true,
                        "data": {
                            "data": "پرداخت در محل"
                        }
                    }
                };
            }
        } catch ( err ) {
            console.log( err );
            if ( err ) {
                await transaction.rollback();
            }
            return { "code": 511, "data": { "status": false, "msg": "transaction_faild" } };
        }
    }
    async verify( { refId, clientRefId } ) {
        let data;
        let reserve_r = await this.models.Reserve.findOne( {
            "where": { "uuid": clientRefId, "status": 0 }
        } );
        if ( !reserve_r ) {
            return { "code": 404, "data": { "status": false, "msg": "reserve_notfound" } };
        }

        try {
            data = await payping.verify( reserve_r.totalPrice, refId );
        } catch ( error ) {
            return {
                "code": 400,
                "data": {
                    "status": false,
                    "data": {
                        "message": error.message
                    }
                }
            };
        }
        await reserve_r.update( { "status": 1 } );
        let reserveItem_r = await this.models.ReserveItem.update(
            { "ReserveUuid": reserve_r.uuid },
            { "where": { "user": reserve_r.UserUuid, "seller": reserve_r.seller, "ReserveUuid": null } }
        );
        return { "code": 200, "data": { "status": true, "data": reserve_r } };
    }
}
module.exports = Logics;
