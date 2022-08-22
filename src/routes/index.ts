import { Router } from 'express';
import authorizeApplication, {
    applicationKeySchema,
} from '../middlewares/authorization/authorizeApplication';
import validateSchema from '../middlewares/validation/validateSchema';

import v1Routes from './v1';

const apiRoutes = Router();

apiRoutes.get('/', (req, res) => {
    return res.status(200).json({ message: 'API is Running' });
});

apiRoutes.use(validateSchema(applicationKeySchema), authorizeApplication);
apiRoutes.use('/v1', v1Routes);

export default apiRoutes;
