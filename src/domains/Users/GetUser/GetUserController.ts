import { Request } from 'express';
import User from '../../../entities/User';

import { GetUserDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import StatusCode from '../../../enums/StatusCodesEnum';

export default class GetUserController extends BaseController<
    [User],
    [GetUserDTO]
> {
    protected statusCode = StatusCode.OK;

    protected message = 'User successfully retrieved';

    public async handler(request: Request) {
        const { user_id } = request.params;

        const application_key = request.query.application_key as string;

        const data: GetUserDTO = {
            user_id,
            application_id: application_key,
        };

        const user = (await this.service.getUser.execute(data)) as User;

        return this.success(user.toJson());
    }
}
