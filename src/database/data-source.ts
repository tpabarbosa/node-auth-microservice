/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource, DataSourceOptions } from 'typeorm';

if (!process.env.POSTGRES_URL) {
    const dotenv = require('dotenv');
    dotenv.config();
}

let options: DataSourceOptions;
if (process.env.NODE_ENV === 'test') {
    options = {
        type: 'sqlite',
        database: './tests/database/database.sqlite.db',
        synchronize: false,
        logging: true,
        entities: ['./src/entities/**/*.ts'],
        subscribers: [],
        migrations: ['./src/database/migrations/**/*.ts'],
    };
} else {
    options = {
        type: 'postgres',
        url: process.env.POSTGRES_URL,
        synchronize: false,
        logging: false,
        entities: ['./src/entities/**/*.ts'],
        subscribers: [],
        migrations: ['./src/database/migrations/**/*.ts'],
    };
}

const AppDataSource = new DataSource(options);

export default AppDataSource;
