import User from '../../../entities/User';
import { GetUsersDTO } from '.';
import BaseRepoService from '../../../baseClasses/BaseRepoService';

export default class GetUsersService extends BaseRepoService<
    [User],
    GetUsersDTO
> {
    public async executer(data: GetUsersDTO): Promise<User[]> {
        const users = await this.repository.user.find({
            select: [
                'id',
                'name',
                'email',
                'is_verified',
                'created_at',
                'updated_at',
            ],
            where: {
                application_id: data.application_id,
            },
        });

        return users;
    }
}
