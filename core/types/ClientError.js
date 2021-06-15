class ClientError extends Error {
    constructor( errs, { message = "خطای کاربر" }, responseStatusCode ) {
        super( message );
        this.errs = errs;
        this.responseStatusCode = responseStatusCode;
    }
    getErrorObj() {
        let message = this.message;
        let errs = this.errs;

        return { message, errs };
    }
    getErrorStr() {
        return `Error $$ type:clientError && message:${this.message} $$ error:${this.err}`;
    }
}

module.exports = ClientError;
