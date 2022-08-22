import { DeleteUserDTO } from '.';

import BaseRepoService from '../../../baseClasses/BaseRepoService';
import User from '../../../entities/User';
import NotFoundError from '../../../middlewares/errorHandling/errors/NotFoundError';

export default class DeleteUserService extends BaseRepoService<
    [User],
    DeleteUserDTO
> {
    public async executer(data: DeleteUserDTO): Promise<User> {
        const user = await this.repository.user.findOne({
            where: { id: data.id, application_id: data.application_id },
        });

        if (!user) {
            throw new NotFoundError('User not found');
        }

        this.repository.user.remove(user);
        return user;
    }
}
