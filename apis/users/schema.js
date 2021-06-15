const constants = require( '../../services/users/constants' );

module.exports = {
    "registerUser": {
        "body": {
            "required": [ "name", "phone", "bday" ],
            "properties": {
                "name": { "type": "string", "maxLength": 32 },
                "phone": { "type": "string", "minLength": 10, "maxLength": 11 },
                "bday": { "type": "string" },
                "familiarity": { "type": "string", "maxLength": 32 }
            }
        }
    },
    "login": {
        "body": {
            "type": "object",
            "required": [ "phone" ],
            "properties": {
                "phone": { "type": "string", "minLength": 10, "maxLength": 11 }
            }
        }
    },
    "seeSeller": {
        "params": {
            "type": 'object',
            "properties": {
                "id": { "type": 'string' }
            }
        }
    },
    "getAllSellerCustomers": {
        "query": {
            "properties": {
                "groupBy": { "enum": constants.Attributes }
            }
        }
    },
    "edit": {
        "body": {
            "properties": {
                "name": { "type": 'string', "maxLength": 32 },
                "phone": { "type": "string", "minLength": 10, "maxLength": 11 },
                "bday": { "type": 'string', "maxLength": 10 },
                "familiarity": { "type": "string", "maxLength": 32 },
                "address": { "type": 'string', "maxLength": 300 },
                "sellerDescription": { "type": 'string', "maxLength": 300 }
            }
        }
    }
};
