import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../../database/data-source';
import User from '../../../entities/User';
import GetUserController from './GetUserController';
import GetUserService from './GetUserService';

export const getUserSchema = yup.object({
    params: yup.object({
        user_id: yup
            .string()
            .uuid('Invalid User Id')
            .required()
            .label('User Id'),
    }),
});

export type GetUserDTO = {
    user_id: string;
    application_id: string;
};

const GetUser = (request: Request, response: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User);
    const getUserService = new GetUserService({ user: userRepository });
    const getUserController = new GetUserController({
        getUser: getUserService,
    });

    return getUserController.handle(request, response, next);
};

export default GetUser;
