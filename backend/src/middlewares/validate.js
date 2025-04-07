import { body, validationResult } from 'express-validator';

export const validateRequest = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if(errors.isEmpty()) {
            return next();
        }

        const errorMessages = errors.array().map(err => err.msg);
        res.status(400).json({ errors: errorMessages});
    };
};

export const validateSignup = validateRequest([
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
        .isLength({ min: 6})
        .withMessage('Password must be at least 6 characters')
]);

export const validateLogin = validateRequest([
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
]);