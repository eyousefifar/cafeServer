module.exports = {
    "get": {
        "params": {
            "type": 'object',
            "properties": {
                "id": { "type": 'string' }
            }
        }
    },
    "submit": {
        "params": {
            "type": 'object',
            "properties": {
                "id": { "type": 'string' }
            }
        },
        "body": {
            "type": "object",
            "required": [ 'cleaning', 'environment', 'quality', 'deal' ],
            "properties": {
                'text': { "type": 'string', "maxLength": 1000 },
                'cleaning': { "type": 'integer', "min": 0, "max": 5 },
                'environment': { "type": 'integer', "min": 0, "max": 5 },
                'quality': { "type": 'integer', "min": 0, "max": 5 },
                'deal': { "type": 'integer', "min": 0, "max": 5 }
            }
        }
    },
    "delete": {
        "params": {
            "type": 'object',
            "required": [ "id" ],
            "properties": {
                "id": { "type": 'string' }
            }
        }
    }
};
