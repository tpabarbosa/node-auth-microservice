import User from '../entities/User';
import App from '../entities/Application';

declare global {
    namespace Express {
        interface Request {
            custom?: {
                basicAuthorizationCredentials?: {
                    email: string;
                    password: string;
                } | null;
            };
            user?: User;
            application?: App;
            is_create_user_route?: boolean;
        }
    }
}
