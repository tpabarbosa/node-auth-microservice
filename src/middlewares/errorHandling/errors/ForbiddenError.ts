import StatusCode from '../../../enums/StatusCodesEnum';

import ApplicationError from './ApplicationError';

class ForbiddenError extends ApplicationError<any> {
  public status = StatusCode.FORBIDDEN;
}

export default ForbiddenError;
