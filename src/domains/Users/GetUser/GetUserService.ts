import User from '../../../entities/User';
import { GetUserDTO } from '.';
import BaseRepoService from '../../../baseClasses/BaseRepoService';
import NotFoundError from '../../../middlewares/errorHandling/errors/NotFoundError';

export default class GetUserService extends BaseRepoService<
    [User],
    GetUserDTO
> {
    public async executer(data: GetUserDTO): Promise<User> {
        const user = await this.repository.user.findOne({
            where: { id: data.user_id, application_id: data.application_id },
        });

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user;
    }
}
