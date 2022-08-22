import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';
import User from '../../../entities/User';
import CreateUserController from './CreateUserController';
import CreateUserService from './CreateUserService';

import SendEmailService from '../../../services/SendEmailService';
import Token from '../../../entities/Token';
import UserRole from '../../../enums/UserRoleEnum';

export const createUserSchema = yup.object({
    body: yup.object({
        name: yup.string().required().label('Name'),
        email: yup.string().email().required().label('Email'),
        password: yup.string().required().min(8).label('Password'),
        role: yup.string().label('Role'),
    }),
});

export type CreateUserDTO = {
    user: {
        is_verified: boolean;
        name: string;
        email: string;
        password: string;
        application_id: string;
        role?: UserRole;
    };
    verify_email_token: {
        type: string;
        token: string;
        expires_at: Date;
    };
};

const CreateUser = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const userRepository = AppDataSource.getRepository(User);
    const tokenRepository = AppDataSource.getRepository(Token);
    const createUserService = new CreateUserService({
        user: userRepository,
        token: tokenRepository,
    });
    const sendEmailService = new SendEmailService();
    const createUserController = new CreateUserController({
        createUser: createUserService,
        sendEmail: sendEmailService,
    });

    return createUserController.handle(request, response, next);
};

export default CreateUser;
