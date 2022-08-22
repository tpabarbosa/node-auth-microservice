import { Request, Response, NextFunction } from 'express';
import ValidationError from '../errorHandling/errors/ValidationError';

const getBasicAuthorizationCredentials = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader) {
            throw new ValidationError('Authorization header not found');
        }

        const [authorizationType, base64Token] = authorizationHeader.split(' ');

        if (authorizationType !== 'Basic') {
            throw new ValidationError('Invalid authorization header type');
        }

        const [email, password] = Buffer.from(base64Token, 'base64')
            .toString('utf-8')
            .split(':');

        request.custom = {};
        request.custom.basicAuthorizationCredentials = { email, password };
        return next();
    } catch (error) {
        return next(error);
    }
};

export default getBasicAuthorizationCredentials;
