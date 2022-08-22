import User from '../../../entities/User';

import { AuthenticateUserDTO } from '.';
import BaseRepoService from '../../../baseClasses/BaseRepoService';

export default class AuthenticateUserService extends BaseRepoService<
    [User],
    AuthenticateUserDTO
> {
    public async executer(data: AuthenticateUserDTO): Promise<User> {
        const user = await this.repository.user.findOne({
            where: {
                email: data.email,
                application_id: data.application_id,
            },
        });

        return user;
    }
}
