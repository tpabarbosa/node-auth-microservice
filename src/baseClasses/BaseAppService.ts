import ApplicationServiceError from '../middlewares/errorHandling/errors/ApplicationServiceError';
import BaseService from './BaseService';

abstract class BaseAppService<DTO> extends BaseService<DTO> {
    public abstract executer(data: DTO): Promise<unknown>;

    protected catchErrorCb = (error: unknown) => {
        return new ApplicationServiceError(
            'Some error occurred while trying to execute application service',
            error as Error
        );
    };
}

export default BaseAppService;
