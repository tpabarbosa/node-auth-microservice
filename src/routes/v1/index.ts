import { Router } from 'express';
import usersRouter from './users.routes';
import authRouter from './auth.routes';
import applicationsRouter from './application.routes';
import validateSchema from '../../middlewares/validation/validateSchema';
import verifyEmailToken, {
    verifyEmailTokenSchema,
} from '../../domains/Tokens/VerifyEmailToken';

const v1Routes = Router();

v1Routes.get('/', (req, res) => {
    return res.status(200).json({ message: 'Versão 1 da API' });
});
v1Routes.get(
    '/verify-email',
    validateSchema(verifyEmailTokenSchema),
    verifyEmailToken
);
v1Routes.use('/users', usersRouter);
v1Routes.use('/auth', authRouter);
v1Routes.use('/applications', applicationsRouter);

export default v1Routes;
