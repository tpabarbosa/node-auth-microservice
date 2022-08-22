import JWT from 'jsonwebtoken';
import config from '../config';
import Application from '../entities/Application';

import User from '../entities/User';

import ValidationError from '../middlewares/errorHandling/errors/ValidationError';

const generate = (user: User, application: Application) => {
    try {
        const token = JWT.sign({}, config.JWT_PRIVATE_KEY, {
            audience: application.id,
            subject: user.id,
            expiresIn: '2h',
        });
        return token;
    } catch (error) {
        return '';
    }
};

const verify = (jwtToken: string) => {
    try {
        const tokenPayload = JWT.verify(jwtToken, config.JWT_PRIVATE_KEY);

        if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
            throw new ValidationError('Invalid token');
        }

        return tokenPayload;
    } catch (error) {
        throw new ValidationError('Invalid token');
    }
};

export default { generate, verify };
