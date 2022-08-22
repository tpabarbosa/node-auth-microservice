import { Request } from 'express';
import User from '../../../entities/User';

import { AuthenticateUserDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';
import StatusCode from '../../../enums/StatusCodesEnum';
import PasswordHelper from '../../../helpers/PasswordHelper';
import ApplicationError from '../../../middlewares/errorHandling/errors/ApplicationError';
import JWTHelper from '../../../helpers/JWTHelper';
import Application from '../../../entities/Application';

export default class AuthenticateUserController extends BaseController<
    [User],
    [AuthenticateUserDTO]
> {
    protected statusCode = StatusCode.OK;

    protected message = 'User succesfully Authenticated';

    public async handler(request: Request) {
        const { email, password } =
            request.custom.basicAuthorizationCredentials;

        const { application } = request;

        const data: AuthenticateUserDTO = {
            email,
            application_id: application.id,
        };

        const user = (await this.service.authenticateUser.execute(
            data
        )) as User;

        if (!user || !this.isValidPassword(password, user.password)) {
            throw new ForbiddenError('Invalid credentials');
        }
        const token = this.setAuthToken(user, application);

        if (!token) {
            throw new ApplicationError(
                'Error while generating token. Please try again.'
            );
        }

        return this.success({ user: user.toJson(), token });
    }

    private isValidPassword(password: string, hashed: string) {
        return PasswordHelper.compare(password, hashed);
    }

    private setAuthToken(user: User, application: Application) {
        return JWTHelper.generate(user, application);
    }
}
