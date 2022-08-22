import { Router } from 'express';
import AuthenticateUser, {
    basicAuthorizationSchema,
} from '../../domains/Auth/AuthenticateUser';
import getBasicAuthorizationCredentials from '../../middlewares/authorization/getBasicAuthorizationCredentials';
import validateSchema from '../../middlewares/validation/validateSchema';

const authRouter = Router();

// authRouter.get('/', (req, res, next) => {
//     return res.status(200).json({ token: '' });
// });

authRouter.post(
    '/token',
    getBasicAuthorizationCredentials,
    validateSchema(basicAuthorizationSchema),
    AuthenticateUser
);

export default authRouter;
