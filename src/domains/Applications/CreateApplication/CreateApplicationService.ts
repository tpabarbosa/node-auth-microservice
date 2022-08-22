import Token from '../../../entities/Token';
import Application from '../../../entities/Application';

import { CreateApplicationDTO } from '.';
import BaseRepoService from '../../../baseClasses/BaseRepoService';
import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';
import User from '../../../entities/User';

export type CreateApplicationServiceReturn = {
    verify_email_token: Token;
    user: User;
    application: Application;
};

export default class CreateApplicationService extends BaseRepoService<
    [Application, Token, User],
    CreateApplicationDTO
> {
    public async executer(
        data: CreateApplicationDTO
    ): Promise<CreateApplicationServiceReturn> {
        const hasApplication = await this.repository.application.findOne({
            where: {
                email: data.application.email,
                name: data.application.name,
            },
        });
        if (hasApplication) {
            throw new ForbiddenError('Application already exists');
        }

        const application = this.repository.application.create({
            ...data.application,
        }) as Application;
        await this.repository.application.save(application);

        const user = this.repository.user.create({
            ...data.user,
            application_id: application.id,
        }) as User;
        await this.repository.user.save(user);

        const verify_email_token = this.repository.token.create({
            ...data.verify_email_token,
            context: application.id,
        }) as Token;

        await this.repository.token.save(verify_email_token);

        return { application, verify_email_token, user };
    }
}
