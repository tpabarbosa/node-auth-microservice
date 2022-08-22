import crypto from 'crypto';
import { Request } from 'express';

import User from '../../../entities/User';
import Token from '../../../entities/Token';
import { EmailDTO } from '../../../services/SendEmailService';
import BaseController from '../../../baseClasses/BaseController';
import { CreateUserDTO } from '.';
import PasswordHelper from '../../../helpers/PasswordHelper';
import StatusCode from '../../../enums/StatusCodesEnum';
import { CreateUserServiceReturn } from './CreateUserService';
import UserRole from '../../../enums/UserRoleEnum';

export default class CreateUserController extends BaseController<
    [User, Token],
    [CreateUserDTO, EmailDTO]
> {
    protected statusCode = StatusCode.CREATED;

    protected message = 'User succesfully Created';

    public async handler(request: Request) {
        const { name, email, password, role } = request.body;

        const application_key = request.query.application_key as string;

        const reqRole = request.user.role;
        const data: CreateUserDTO = {
            user: {
                is_verified: false,
                name,
                email,
                password: this.setPassword(password),
                application_id: application_key,
                ...(reqRole !== UserRole.GUEST && role),
            },
            verify_email_token: {
                type: 'verify-email',
                token: crypto.randomBytes(60).toString('hex'),
                expires_at: null,
            },
        };

        const { user, verify_email_token } =
            (await this.service.createUser.execute(
                data
            )) as CreateUserServiceReturn;

        await this.service.sendEmail.execute({
            type: 'User Created',
            data: { user: user.toJson(), token: verify_email_token },
        });

        return this.success({ user: user.toJson(), token: verify_email_token });
    }

    private setPassword(password: string) {
        return PasswordHelper.encrypt(password);
    }
}
