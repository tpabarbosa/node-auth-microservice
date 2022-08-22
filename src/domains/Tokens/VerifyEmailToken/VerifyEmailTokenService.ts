import User from '../../../entities/User';

import { VerifyEmailTokenDTO } from '.';

import Token from '../../../entities/Token';
import BaseRepoService from '../../../baseClasses/BaseRepoService';
import NotFoundError from '../../../middlewares/errorHandling/errors/NotFoundError';
import UnauthorizedError from '../../../middlewares/errorHandling/errors/UnauthorizedError';

export default class VerifyEmailTokenService extends BaseRepoService<
    [User, Token],
    VerifyEmailTokenDTO
> {
    public async executer(data: VerifyEmailTokenDTO): Promise<User> {
        const token = await this.repository.token.findOne({
            select: ['id', 'context'],
            where: {
                token: data.token,
            },
        });

        if (!token) {
            throw new NotFoundError('User not found');
        }

        if (token.context !== data.user_id) {
            throw new UnauthorizedError(
                'This token is not valid for this user'
            );
        }

        const user = (await this.repository.user.findOneBy({
            id: data.user_id,
        })) as User;

        if (!user) {
            throw new NotFoundError('User not found');
        }

        user.is_verified = true;
        await this.repository.user.save(user);
        await this.repository.token.remove(token);

        return user;
    }
}
