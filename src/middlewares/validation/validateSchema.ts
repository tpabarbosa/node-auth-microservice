import { Request, Response, NextFunction } from 'express';
import ApplicationError from '../errorHandling/errors/ApplicationError';
import ValidationError from '../errorHandling/errors/ValidationError';

type Obj = {
    [key: string]: string[] | Obj;
};

const validateSchema =
    (schema) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params,
                    custom: req.custom,
                },
                { abortEarly: false }
            );
            return next();
        } catch (err) {
            if (!err.errors) {
                return next(new ApplicationError('Internal server error', err));
            }
            let validationErrorObject: Obj = {};

            const recursive = (string: string, obj: Obj, message) => {
                const splited = /(.*?)[.](.+)/.exec(string);
                const newObj: Obj = { ...obj };

                if (splited && splited[1]) {
                    if (splited[2]) {
                        newObj[splited[1]] = recursive(
                            splited[2],
                            newObj[splited[1]] as Obj,
                            message
                        );
                    } else {
                        const test: string[] =
                            (newObj[splited[1]] as string[]) || [];
                        test.push(message);
                        newObj[splited[1]] = test;
                    }
                } else {
                    const test: string[] = (newObj[string] as string[]) || [];
                    test.push(message);
                    newObj[string] = test;
                }

                return newObj;
            };

            err.inner.forEach((error) => {
                const splited = /(.*?)[.](.+)/.exec(error.path);
                if (splited && splited[2]) {
                    validationErrorObject = recursive(
                        splited[2],
                        validationErrorObject,
                        error.message
                    );
                } else {
                    validationErrorObject = recursive(
                        error.path,
                        validationErrorObject,
                        error.message
                    );
                }
            });

            const message =
                err.errors.length > 1 ? 'Invalid request data' : err.message;
            const error = err.errors.length > 1 ? err.errors : undefined;
            return next(new ValidationError(message, validationErrorObject));
        }
    };

export default validateSchema;
