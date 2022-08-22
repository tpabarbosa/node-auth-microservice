import StatusCode from '../../../enums/StatusCodesEnum';

import ApplicationError from './ApplicationError';

class BadRequestError extends ApplicationError<void> {
  public status = StatusCode.BAD_REQUEST;
}

export default BadRequestError;
