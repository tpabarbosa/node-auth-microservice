import { Router } from 'express';
import validateSchema from '../../middlewares/validation/validateSchema';

import authorize from '../../middlewares/authorization/authorizeRoles';
import authenticate from '../../middlewares/authentication/authenticateJwtToken';
import UserRole from '../../enums/UserRoleEnum';
import CreateApplication, {
    createApplicationSchema,
} from '../../domains/Applications/CreateApplication';

const applicationsRouter = Router();

applicationsRouter.get(
    '/',
    authenticate(),
    authorize(UserRole.SERVICE_ADMIN)
    // GetApplications
);

applicationsRouter.get(
    '/:application_id',
    authenticate(),
    authorize([UserRole.SERVICE_ADMIN, UserRole.APP_ADMIN])
    // GetApplication
);

applicationsRouter.post(
    '/',
    authenticate(),
    validateSchema(createApplicationSchema),
    authorize(UserRole.SERVICE_ADMIN),
    CreateApplication
);

export default applicationsRouter;
