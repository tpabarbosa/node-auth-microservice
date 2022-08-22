import { Request } from 'express';
import crypto from 'crypto';

import Application from '../../../entities/Application';
import Token from '../../../entities/Token';
import { EmailDTO } from '../../../services/SendEmailService';
import BaseController from '../../../baseClasses/BaseController';
import { CreateApplicationDTO } from '.';

import StatusCode from '../../../enums/StatusCodesEnum';
import { CreateApplicationServiceReturn } from './CreateApplicationService';
import PasswordHelper from '../../../helpers/PasswordHelper';
import UserRole from '../../../enums/UserRoleEnum';

export default class CreateApplicationController extends BaseController<
    [Application, Token],
    [CreateApplicationDTO, EmailDTO]
> {
    protected statusCode = StatusCode.CREATED;

    protected message = 'Application succesfully created';

    public async handler(request: Request) {
        const {
            application_name,
            admin_name,
            email,
            password,
            allowed_roles_to_create_users,
            default_role,
        } = request.body;

        const data: CreateApplicationDTO = {
            application: {
                is_verified: false,
                name: application_name,
                email,
                allowed_roles_to_create_users: [
                    UserRole.APP_ADMIN,
                    ...(allowed_roles_to_create_users ?? []),
                ].join(','),
                default_role:
                    default_role &&
                    default_role !== UserRole.APP_ADMIN &&
                    default_role !== UserRole.GUEST &&
                    default_role in UserRole
                        ? default_role
                        : UserRole.USER,
            },
            user: {
                is_verified: false,
                name: admin_name,
                email,
                password: this.setPassword(password),
                role: UserRole.APP_ADMIN,
            },
            verify_email_token: {
                type: 'verify-application-email',
                token: crypto.randomBytes(60).toString('hex'),
                expires_at: null,
            },
        };

        const { application, user, verify_email_token } =
            (await this.service.createApplication.execute(
                data
            )) as CreateApplicationServiceReturn;

        await this.service.sendEmail.execute({
            type: 'Application Created',
            data: {
                application,
                user: user.toJson(),
                token: verify_email_token,
            },
        });

        return this.success(application);
    }

    private setPassword(password: string) {
        return PasswordHelper.encrypt(password);
    }
}
