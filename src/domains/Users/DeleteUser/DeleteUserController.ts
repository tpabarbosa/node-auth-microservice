import { Request } from 'express';
import User from '../../../entities/User';
import { DeleteUserDTO } from '.';
import BaseController from '../../../baseClasses/BaseController';
import StatusCode from '../../../enums/StatusCodesEnum';

export default class DeleteUserController extends BaseController<
    [User],
    [DeleteUserDTO]
> {
    protected statusCode = StatusCode.DELETED;

    protected message = 'User successfully deleted';

    public async handler(request: Request) {
        const { id } = request.params;

        const application_key = request.query.application_key as string;

        const data: DeleteUserDTO = {
            id,
            application_id: application_key,
        };

        await this.service.deleteUser.execute(data);

        return this.success();
    }
}
