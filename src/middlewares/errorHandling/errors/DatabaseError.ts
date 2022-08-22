import ApplicationError from './ApplicationError';

class DatabaseError extends ApplicationError<Error> {}

export default DatabaseError;
