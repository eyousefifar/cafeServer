module.exports = {
    "seller": {
        "params": {
            "type": 'object',
            "properties": {
                "seller": { "type": 'string' }
            }
        }
    },
    "add": {
        "body": {
            "required": [ "day" ],
            "properties": {
                "day": { "type": "string", "maxLength": 10, "minLength": 8 }
            }
        }
    },
    "delete": {
        "params": {
            "type": 'object',
            "properties": {
                "id": { "type": 'string' }
            }
        }
    }
};
