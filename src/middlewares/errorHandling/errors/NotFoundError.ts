import StatusCode from '../../../enums/StatusCodesEnum';

import ApplicationError from './ApplicationError';

class NotFoundError extends ApplicationError<void> {
  public status = StatusCode.NOT_FOUND;
}

export default NotFoundError;
