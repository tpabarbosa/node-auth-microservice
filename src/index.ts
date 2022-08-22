import 'dotenv/config';
import 'reflect-metadata';
import Server from './server';
import AppDataSource from './database/data-source';

function bootstrap() {
    AppDataSource.initialize()
        .then(() => {
            const server = new Server();
            server.init();
        })
        .catch((err) => {
            console.error('Database initialization error:');
            console.error(err);
        });
}

bootstrap();

export default bootstrap;
