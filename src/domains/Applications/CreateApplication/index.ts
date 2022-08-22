import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';
import Application from '../../../entities/Application';
import CreateApplicationController from './CreateApplicationController';
import CreateApplicationService from './CreateApplicationService';

import SendEmailService from '../../../services/SendEmailService';
import Token from '../../../entities/Token';
import UserRole from '../../../enums/UserRoleEnum';
import User from '../../../entities/User';

export const createApplicationSchema = yup.object({
    body: yup.object({
        application_name: yup.string().required().label('Application Name'),
        admin_name: yup.string().required().label('Admin Name'),
        email: yup.string().email().required().label('Email'),
        password: yup.string().required().min(8).label('Password'),
        allowed_roles_to_create_users: yup
            .array()
            .of(yup.mixed<UserRole>().oneOf(Object.values(UserRole)))
            .label('Allowed Roles to Create Users'),
        default_role: yup.string().label('Default Role'),
    }),
});

export type CreateApplicationDTO = {
    application: {
        is_verified: boolean;
        name: string;
        email: string;
        allowed_roles_to_create_users: string;
        default_role: UserRole;
    };
    user: {
        is_verified: boolean;
        name: string;
        email: string;
        password: string;
        role: UserRole;
    };
    verify_email_token: {
        type: string;
        token: string;
        expires_at: Date;
    };
};

const CreateApplication = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const applicationRepository = AppDataSource.getRepository(Application);
    const tokenRepository = AppDataSource.getRepository(Token);
    const userRepository = AppDataSource.getRepository(User);

    const createApplicationService = new CreateApplicationService({
        application: applicationRepository,
        token: tokenRepository,
        user: userRepository,
    });
    const sendEmailService = new SendEmailService();
    const createApplicationController = new CreateApplicationController({
        createApplication: createApplicationService,
        sendEmail: sendEmailService,
    });

    return createApplicationController.handle(request, response, next);
};

export default CreateApplication;
