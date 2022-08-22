/* eslint-disable no-useless-constructor */
// eslint-disable-next-line max-classes-per-file
export default class HttpResponse<ResponseData, ResponseError> {
    constructor(
        public statusCode: number,
        public body: {
            message: string;
            data?: ResponseData;
            errors?: ResponseError;
            status?: 'error' | 'success';
            error_code?: number;
        }
    ) {}
}

export class HttpErrorResponse<ResponseError> extends HttpResponse<
    never,
    ResponseError
> {
    constructor(
        statusCode: number,
        body: {
            message: string;
            errors: ResponseError;
            error_code?: number;
        }
    ) {
        super(statusCode, { ...body, status: 'error' });
        console.log(this);
    }
}

export class HttpSuccessResponse<ResponseData> extends HttpResponse<
    ResponseData,
    never
> {
    constructor(
        statusCode: number,
        body: {
            message: string;
            data: ResponseData;
        }
    ) {
        super(statusCode, { ...body, status: 'success' });
    }
}
