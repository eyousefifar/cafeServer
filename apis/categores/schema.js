module.exports = {
    "get": {
        "params": {
            "type": 'object',
            "properties": {
                "seller": { "type": 'string' }
            }
        }
    },
    "add": {
        "body": {
            "required": [ "name", "desc" ],
            "properties": {
                "name": { "type": "string" },
                "desc": { "type": "string" }
            }
        }
    },
    "edit": {
        "params": {
            "type": 'object',
            "properties": {
                "id": { "type": 'string' }
            }
        },
        "body": {
            "required": [ "name", "desc" ],
            "properties": {
                "name": { "type": "string" },
                "desc": { "type": "string" }
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
