import StatusCode from '../../../enums/StatusCodesEnum';

import ApplicationError from './ApplicationError';

class ValidationError extends ApplicationError<
  void | string[] | Record<string, unknown>
> {
  public status = StatusCode.BAD_REQUEST;
}

export default ValidationError;
