import StatusCode from '../../../enums/StatusCodesEnum';

class ApplicationError<ResponseError> extends Error {
  public status = StatusCode.INTERNAL_SERVER_ERROR;

  constructor(public message: string, public errors?: ResponseError) {
    super(message);
  }
}

export default ApplicationError;
