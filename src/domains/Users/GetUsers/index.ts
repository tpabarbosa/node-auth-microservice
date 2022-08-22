import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../../../database/data-source';
import User from '../../../entities/User';
import GetUsersController from './GetUsersController';
import GetUsersService from './GetUsersService';

export type GetUsersDTO = {
    application_id: string;
};

const GetUsers = (request: Request, response: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User);
    const getUsersService = new GetUsersService({ user: userRepository });
    const getUsersController = new GetUsersController({
        getUsers: getUsersService,
    });

    return getUsersController.handle(request, response, next);
};

export default GetUsers;
