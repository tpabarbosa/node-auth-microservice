import express, { NextFunction } from 'express';
import routes from './routes';

import config from './config';
import errorHandler from './middlewares/errorHandling';
import NotFoundError from './middlewares/errorHandling/errors/NotFoundError';

const { PORT, HOST } = config;

export default class Server {
    // public constructor() {}

    public init() {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.get('/', (request, response) =>
            response.json({
                message: 'Meu server Express, Typescript e ESLint!',
            })
        );

        app.use('/api', routes);

        app.all('/*', (request, response, next: NextFunction) => {
            return next(new NotFoundError('Resource not found'));
        });

        app.use(errorHandler);

        app.listen(PORT as number, HOST, () => {
            // eslint-disable-next-line no-console
            console.log(`Back-end started in ${HOST}:${PORT} port!`);
        });
    }
}
