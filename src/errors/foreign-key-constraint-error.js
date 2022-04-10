import { CustomError } from './custom-error';

export class ForeignKeyConstraintError extends CustomError {
    statusCode = 400
     reason = 'Foreign Key Constaint Error';

    constructor() {
        super();

        Object.setPrototypeOf(this, ForeignKeyConstraintError.prototype);
    }
}
