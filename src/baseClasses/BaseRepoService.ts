import { EntityPropertyNotFoundError, Repository } from 'typeorm';
import { OneOf } from '../@types/typesHelper';
import BadRequestError from '../middlewares/errorHandling/errors/BadRequestError';
import DatabaseError from '../middlewares/errorHandling/errors/DatabaseError';
import BaseEntity from './BaseEntity';
import BaseService from './BaseService';

abstract class BaseRepoService<
    Models extends BaseEntity[],
    DTO
> extends BaseService<DTO> {
    public constructor(
        protected repository: { [name: string]: Repository<OneOf<Models>> }
    ) {
        super();
    }

    protected catchErrorCb = (error: unknown) => {
        if (error instanceof EntityPropertyNotFoundError) {
            return new BadRequestError(error.message);
        }
        return new DatabaseError(
            'Some error occurred while trying to execute database service',
            error as Error
        );
    };
}

export default BaseRepoService;
