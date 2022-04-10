import { Request, Response, NextFunction, response } from 'express';
import createHttpError from 'http-errors';

export const notFound = (
    request ,
    response,
    next,
) => {
    throw new createHttpError.NotFound('Route not found');
};
