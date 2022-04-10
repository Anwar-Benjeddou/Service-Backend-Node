
const {validationResult}= require ('express-validator') ;

const  createHttpError = require('http-errors');

 const validateRequest = (
    req,
    res,
    next,
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new createHttpError.BadRequest(
                errors
                    .array()
                    .map((err) => err.msg)
                    .toString(),
            ),
        );
    }

    next();
};
module.exports =validateRequest;