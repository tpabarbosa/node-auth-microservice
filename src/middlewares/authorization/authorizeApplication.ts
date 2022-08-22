import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import AppDataSource from '../../database/data-source';
import Application from '../../entities/Application';
import DatabaseError from '../errorHandling/errors/DatabaseError';
import UnauthorizedError from '../errorHandling/errors/UnauthorizedError';

export const applicationKeySchema = yup.object({
    query: yup.object({
        application_key: yup
            .string()
            .uuid('Invalid Application key')
            .required()
            .label('Application key'),
    }),
});

const authorizeApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const application_id = req.query.application_key as string;

        const applicationRepository = AppDataSource.getRepository(Application);
        const application = await applicationRepository.findOne({
            where: { id: application_id },
        });

        if (!application) {
            return next(new UnauthorizedError('Invalid Application key'));
        }

        req.application = application;
        return next();
    } catch (err) {
        return next(new DatabaseError(err.message, err));
    }
};

export default authorizeApplication;
