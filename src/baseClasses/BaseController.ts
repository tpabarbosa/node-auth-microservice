/* eslint-disable no-useless-constructor */

import { Request, Response, NextFunction } from 'express';

import { OneOf } from '../@types/typesHelper';
import StatusCode from '../enums/StatusCodesEnum';
import BaseAppService from './BaseAppService';
import BaseEntity from './BaseEntity';
import BaseRepoService from './BaseRepoService';

import { HttpSuccessResponse } from './HttpResponse';

abstract class BaseController<
    Models extends BaseEntity[],
    DTOS extends Record<string, unknown>[]
> {
    protected abstract statusCode: StatusCode;

    protected abstract message: string;

    constructor(
        protected service: {
            [name: string]: OneOf<
                [
                    BaseRepoService<Models, OneOf<DTOS>>,
                    BaseAppService<OneOf<DTOS>>
                ]
            >;
        }
    ) {}

    public abstract handler(
        request: Request,
        response: Response,
        next?: NextFunction
    ): Promise<HttpSuccessResponse<unknown>>;

    public async handle(
        request: Request,
        response: Response,
        next?: NextFunction
    ): Promise<Response | void> {
        try {
            const httpResponse = await this.handler(request, response, next);
            return response
                .status(httpResponse.statusCode)
                .json(httpResponse.body);
        } catch (error) {
            return next(error);
        }
    }

    protected success = <ResponseData>(
        // statusCode: StatusCode,
        // message: string,
        data?: ResponseData
    ) => {
        return new HttpSuccessResponse(this.statusCode, {
            message: this.message,
            data,
        });
    };
}

export default BaseController;
