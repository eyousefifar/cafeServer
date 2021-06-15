module.exports = {
    "reserves": {
        "querystring": {
            "type": "object",
            "properties": {
                "skip": { "type": 'integer', "minimum": 0 },
                "limit": { "type": 'integer', "maximum": 50, "minimum": 0 }
            }
        }
    },
    "push": {
        "params": {
            "type": 'object',
            "properties": {
                "product": { "type": 'string' }
            }
        },
        "body": {
            "type": 'object',
            "properties": {
                "count": { "type": 'integer' }
            }
        }
    },
    "pop": {
        "params": {
            "type": 'object',
            "properties": {
                "product": { "type": 'string' }
            }
        }
    },
    "pay": {
        "body": {
            "type": 'object',
            "required": [ "seller", "tabel", "day", "at" ],
            "properties": {
                "seller": { "type": 'string' },
                "tabel": { "type": 'string' },
                "day": { "type": 'string' },
                "discountCode": { "type": 'string' },
                "at": { "type": 'string' }
            }
        }
    }
};
