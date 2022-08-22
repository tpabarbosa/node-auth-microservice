import Token from '../../../entities/Token';
import User from '../../../entities/User';

import { CreateUserDTO } from '.';
import BaseRepoService from '../../../baseClasses/BaseRepoService';
import ForbiddenError from '../../../middlewares/errorHandling/errors/ForbiddenError';

export type CreateUserServiceReturn = {
    verify_email_token: Token;
    user: User;
};

export default class CreateUserService extends BaseRepoService<
    [User, Token],
    CreateUserDTO
> {
    public async executer(
        data: CreateUserDTO
    ): Promise<CreateUserServiceReturn> {
        const hasUser = await this.repository.user.findOne({
            where: {
                email: data.user.email,
                application_id: data.user.application_id,
            },
        });
        if (hasUser) {
            throw new ForbiddenError('User already exists');
        }

        const user = this.repository.user.create({ ...data.user }) as User;
        await this.repository.user.save(user);

        const verify_email_token = this.repository.token.create({
            ...data.verify_email_token,
            context: user.id,
        }) as Token;

        await this.repository.token.save(verify_email_token);

        return { user, verify_email_token };
    }
}
