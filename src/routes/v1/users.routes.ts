import { Router } from 'express';
import CreateUser, { createUserSchema } from '../../domains/Users/CreateUser';
import validateSchema from '../../middlewares/validation/validateSchema';
import authorize from '../../middlewares/authorization/authorizeRoles';
import authenticate from '../../middlewares/authentication/authenticateJwtToken';

import GetUsers from '../../domains/Users/GetUsers';
import GetUser, { getUserSchema } from '../../domains/Users/GetUser';
import DeleteUser, { deleteUserSchema } from '../../domains/Users/DeleteUser';
import UserRole from '../../enums/UserRoleEnum';

const usersRouter = Router();

usersRouter.get(
    '/',
    authenticate(),
    authorize([UserRole.SERVICE_ADMIN, UserRole.APP_ADMIN]),
    GetUsers
);

usersRouter.get(
    '/:user_id',
    authenticate(),
    validateSchema(getUserSchema),
    authorize([UserRole.SERVICE_ADMIN, UserRole.APP_ADMIN, UserRole.USER]),
    GetUser
);

usersRouter.post(
    '/',
    // (req, res, next) => {
    //     req.is_create_user_route = true;
    //     return next();
    // },
    authenticate({ allowGuest: true }),
    validateSchema(createUserSchema),
    authorize([UserRole.SERVICE_ADMIN, UserRole.APP_ADMIN], {
        checkApplicationPolicies: ['allowedRolesToCreateUsers'],
    }),
    CreateUser
);

usersRouter.delete(
    '/:user_id',
    validateSchema(deleteUserSchema),
    authorize([UserRole.SERVICE_ADMIN, UserRole.APP_ADMIN, UserRole.USER]),
    DeleteUser
);

export default usersRouter;
