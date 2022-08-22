import AppDataSource from '../../../database/data-source';
import User from '../../../entities/User';
import DeleteUserController from './DeleteUserController';
import DeleteUserService from './DeleteUserService';
import { Request, Response, NextFunction } from 'express';

import * as yup from 'yup';

export const deleteUserSchema = yup.object({
  params: yup.object({
    id: yup.string().uuid('Invalid User Id').required().label('User Id'),
  }),
});

export type DeleteUserDTO = {
  id: string;
  application_id: string;
};

const DeleteUser = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const userRepository = AppDataSource.getRepository(User);
  const deleteUserService = new DeleteUserService({ user: userRepository });
  const deleteUserController = new DeleteUserController({
    deleteUser: deleteUserService,
  });

  return deleteUserController.handle(request, response, next);
};

export default DeleteUser;
