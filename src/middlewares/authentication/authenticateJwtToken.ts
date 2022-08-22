import { Request, Response, NextFunction } from 'express';

import AppDataSource from '../../database/data-source';
import User from '../../entities/User';
import UserRole from '../../enums/UserRoleEnum';

import JWTHelper from '../../helpers/JWTHelper';
import ValidationError from '../errorHandling/errors/ValidationError';

const DEFAULT_AUTHENTICATION_OPTIONS = {
    allowGuest: false,
};

const authenticate =
    (options = DEFAULT_AUTHENTICATION_OPTIONS) =>
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { allowGuest } = options;
            const authorizationHeader = request.headers.authorization;

            if (!authorizationHeader && !allowGuest) {
                throw new ValidationError('Authorization header not found');
            }

            if (authorizationHeader) {
                const [authorizationType, jwtToken] =
                    authorizationHeader.split(' ');

                if (authorizationType !== 'Bearer' && !allowGuest) {
                    throw new ValidationError(
                        'Invalid authorization header type'
                    );
                }

                if (!jwtToken && !allowGuest) {
                    throw new ValidationError('Token not found');
                }

                if (jwtToken) {
                    const tokenPayload = JWTHelper.verify(jwtToken);

                    const userRepository = AppDataSource.getRepository(User);

                    const user = await userRepository.findOneBy({
                        id: tokenPayload.sub,
                    });

                    if (!user) {
                        throw new ValidationError('Invalid Token Data');
                    }
                    request.user = user;
                    return next();
                }
            }
            if (allowGuest) {
                const user = new User();
                user.role = UserRole.GUEST;
                request.user = user;
            }

            return next();
        } catch (error) {
            return next(error);
        }
    };

export default authenticate;
