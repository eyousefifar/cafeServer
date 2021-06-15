const constants = require( '../../services/discounts/constants' );

module.exports = {
    // get all discounts schema
    "allDiscountsSeller": {
    },
    // get a specific discount
    "getDiscount": {
        "required": [ "discountUUID" ],
        "params": {
            "type": "object",
            "properties": {
                "discountUUID": { "type": "string", "format": "uuid" }
            }
        }
    },
    "createDiscount": {
        "body": {
            "required": [ "expDate", "percentage", "templateType" ],
            "properties": {
                "code": { "type": "string", "minLength": 6, "maxLength": 6 },
                "expDate": { "type": "string" },
                "percentage": { "type": "number", "minimum": 1, "maximum": 99 },
                "maxValue": { "type": "number", "minimum": 1 },
                "templateType": { "enum": constants.discountTemplateTypes }
            }
        }
    },
    "deleteDiscount": {
        "params": {
            "type": "object",
            "required": [ "discountUUID" ],
            "properties": {
                "discountUUID": { "type": "string", "format": "uuid" }
            }
        }
    },
    "editDiscount": {
        "body": {
            'properties': {
                "code": { "type": "string", "minLenght": 6, "maxLenght": 6 },
                "expireDate": { "type": "string" },
                "percentage": { "type": "number", "minimum": 1, "maximum": 99 },
                "maxValue": { "type": "number" },
                "templateType": { "enum": constants.discountTemplateTypes }
            }
        },
        "params": {
            "type": "object",
            "properties": {
                "discountUUID": { "type": "string", "format": "uuid" }
            },
            "required": [ "discountUUID" ]
        }
    },
    "validateDiscount": {
        "params": {
            "type": "object",
            "properties": {
                "discountCode": { "type": "string" }
            },
            "required": [ "discountCode" ]
        }
    }
};
