import ApplicationError from '../middlewares/errorHandling/errors/ApplicationError';

abstract class BaseService<DTO> {
    protected abstract catchErrorCb: (error: unknown) => void;

    protected abstract executer(data: DTO): Promise<unknown>;

    public async execute(data: DTO) {
        try {
            return await this.executer(data);
        } catch (error) {
            if (error instanceof ApplicationError) {
                throw error;
            }
            throw this.catchErrorCb(error);
        }
    }
}

export default BaseService;
