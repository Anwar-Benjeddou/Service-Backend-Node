export  class CustomError extends Error {
     statusCode
     reason

    constructor(message) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
