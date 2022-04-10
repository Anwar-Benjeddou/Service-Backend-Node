import { CustomError } from './custom-error';

export class UniqueKeyConstraintError extends CustomError {
     statusCode = 400
    reason= 'Unique Key Constaint Error';

    constructor() {
        super();

        Object.setPrototypeOf(this, UniqueKeyConstraintError.prototype);
    }
}
