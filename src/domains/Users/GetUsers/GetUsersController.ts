import { Request } from 'express';
import User from '../../../entities/User';

import { GetUsersDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import StatusCode from '../../../enums/StatusCodesEnum';

export default class GetUsersController extends BaseController<
    [User],
    [GetUsersDTO]
> {
    protected statusCode = StatusCode.OK;

    protected message = 'Users successfully retrieved';

    public async handler(request: Request) {
        const application_key = request.query.application_key as string;

        const data: GetUsersDTO = {
            application_id: application_key,
        };

        const users = (await this.service.getUsers.execute(data)) as User[];

        return this.success(users.map((user) => user.toJson()));
    }
}
