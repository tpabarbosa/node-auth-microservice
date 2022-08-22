import StatusCode from '../../../enums/StatusCodesEnum';

import ApplicationError from './ApplicationError';

class UnauthorizedError extends ApplicationError<void | string[]> {
  public status = StatusCode.UNAUTHORIZED;
}

export default UnauthorizedError;
