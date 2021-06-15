module.exports = {
    "find": {
        "params": {
            "type": 'object',
            "properties": {
                "id": { "type": 'string' }
            }
        }
    },
    "add": {
        "body": {
            "required": [ "name", "category", "price" ],
            "properties": {
                "name": { "type": "string" },
                "desc": { "type": "string" },
                "price": { "type": "integer" },
                "category": { "type": "string" }
            }
        }
    },
    "getById": {
        "params": {
            "type": 'object',
            "required": [ "id" ],
            "properties": {
                "id": { "type": 'string' }
            }
        }
    },
    "put": {
        "params": {
            "type": 'object',
            "required": [ "id" ],
            "properties": {
                "id": { "type": 'string' }
            }
        },
        "body": {
            "properties": {
                "name": { "type": "string" },
                "desc": { "type": "string" },
                "price": { "type": "integer" },
                "category": { "type": "string" }
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
    },
    "activeToggle": {
        "params": {
            "type": 'object',
            "required": [ "id" ],
            "properties": {
                "id": { "type": 'string' }
            }
        },
        "body": {
            "type": "object",
            "required": [ "status" ],
            "properties": {
                "status": { "type": "boolean" }
            }
        }
    }
};
