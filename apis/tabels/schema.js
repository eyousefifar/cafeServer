module.exports = {
    "get": {
        "params": {
            "type": 'object',
            "properties": {
                "id": { "type": 'string' }
            }
        },
        "querystring": {
            "type": "object",
            "properties": {
                "floor": { "type": 'integer', "maximum": 50, "minimum": 0 }
            }
        }
    },
    "add": {
        "body": {
            "type": "object",
            "required": [ 'name' ],
            "properties": {
                "name": { "type": "string" },
                "floor": { "type": "integer", "maximum": 50, "minimum": 0 },
                "capacity": { "type": "integer", "maximum": 50, "minimum": 0 }
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
            "type": "object",
            "properties": {
                "name": { "type": "string" },
                "floor": { "type": "integer", "maximum": 50, "minimum": 0 },
                "capacity": { "type": "integer", "maximum": 50, "minimum": 0 }
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
