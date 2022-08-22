import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';
import User from '../../../entities/User';
import AuthenticateUserController from './AuthenticateUserController';
import AuthenticateUserService from './AuthenticateUserService';

export const basicAuthorizationSchema = yup.object({
    custom: yup.object({
        basicAuthorizationCredentials: yup.object({
            email: yup.string().email().required().label('Email'),
            password: yup.string().required().label('Password'),
        }),
    }),
});

export type AuthenticateUserDTO = {
    email: string;
    application_id: string;
};

const AuthenticateUser = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const userRepository = AppDataSource.getRepository(User);
    const authenticateUserService = new AuthenticateUserService({
        user: userRepository,
    });
    const authenticateUserController = new AuthenticateUserController({
        authenticateUser: authenticateUserService,
    });

    return authenticateUserController.handle(request, response, next);
};

export default AuthenticateUser;
