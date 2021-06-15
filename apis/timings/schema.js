module.exports = {
    "add": {
        "body": {
            "type": "object",
            "required": [ 'at' ],
            "properties": {
                "at": { "type": "integer", "maximum": 23, "minimum": 0 }
            }
        }
    },
    "delete": {
        "params": {
            "type": "object",
            "required": [ "uuid" ],
            "properties": {
                "uuid": { "type": "string" }
            }
        }
    },
    "statusToggle": {
        "type": "object",
        "required": [ "status" ],
        "properties": {
            "status": { "type": "boolean" }
        }
    },
    "getByTabel": {
        "params": {
            "type": 'object',
            "required": [ "seller", "tabel" ],
            "properties": {
                "seller": { "type": "string", "minLength": 35 },
                "tabel": { "type": "string", "minLength": 35 }
            }
        }
    }
};
