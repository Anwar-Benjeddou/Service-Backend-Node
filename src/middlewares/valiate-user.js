const {body}= require ('express-validator') ;
const validateRequest = require ('./validateRequest') ;

const validateUser = [
    body('username')
       .trim()
       .isString()
       .isLength({ min: 2, max: 50 })
       .withMessage('User user name must be valid'),
    body('firstname')
        .trim()
        .isString()
        .isLength({ min: 2, max: 50 })
        .withMessage('User first name must be valid'),
    body('lastname')
        .trim()
        .isString()
        .isLength({ min: 2, max: 50 })
        .withMessage('User last name must be valid'),
    body('address')
        .trim()
        .isString()
        .isLength({ min: 2, max: 50 })
        .withMessage('User address must be valid'),
    body('email')
        .trim()
        .isString()
        .isLength({ min: 5, max: 255 })
        .withMessage('User email must be valid'),
    body('password')
        .trim()
        .isString()
        .isLength({ min: 4, max: 255 })
        .withMessage('User password must be valid'),
    body('descriminator')
        .trim()
        .isString()
        .isLength({ min: 2, max: 50 })
        .withMessage('User descriminator must be valid'),
    validateRequest,
];
module.exports= validateUser;