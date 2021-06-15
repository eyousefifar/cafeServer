module.exports = {
    "get": {

    },
    "check": {
        "body": {
            "type": "object",
            "required": [ "product" ],
            "properties": {
                "product": { "type": 'string' }
            }
        }
    }
};
