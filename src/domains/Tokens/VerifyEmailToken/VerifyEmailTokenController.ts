import { Request } from 'express';

import { VerifyEmailTokenDTO } from '.';
import User from '../../../entities/User';
import Token from '../../../entities/Token';
import BaseController from '../../../baseClasses/BaseController';
import StatusCode from '../../../enums/StatusCodesEnum';

export default class VerifyEmailTokenController extends BaseController<
    [User, Token],
    [VerifyEmailTokenDTO]
> {
    protected statusCode = StatusCode.ACCEPTED;

    protected message = 'Email verified';

    public async handler(request: Request) {
        const token = request.query.token as string;
        const user_id = request.query.user as string;

        const data: VerifyEmailTokenDTO = {
            token,
            user_id,
        };

        await this.service.verifyEmailToken.execute(data);

        return this.success();
    }
}
