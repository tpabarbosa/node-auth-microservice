import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import AppDataSource from '../../../database/data-source';
import User from '../../../entities/User';
import VerifyEmailTokenController from './VerifyEmailTokenController';
import VerifyEmailTokenService from './VerifyEmailTokenService';

import Token from '../../../entities/Token';

export const verifyEmailTokenSchema = yup.object({
    query: yup.object({
        token: yup.string().required().label('Token'),
        user: yup.string().required().uuid().label('User Id'),
    }),
});

export type VerifyEmailTokenDTO = {
    token: string;
    user_id: string;
};

const VerifyEmailToken = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const tokenRepository = AppDataSource.getRepository(Token);
    const userRepository = AppDataSource.getRepository(User);
    const verifyEmailTokenService = new VerifyEmailTokenService({
        token: tokenRepository,
        user: userRepository,
    });
    const verifyEmailTokenController = new VerifyEmailTokenController({
        verifyEmailToken: verifyEmailTokenService,
    });

    return verifyEmailTokenController.handle(request, response, next);
};

export default VerifyEmailToken;
