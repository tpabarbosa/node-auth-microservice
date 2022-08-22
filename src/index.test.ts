import 'reflect-metadata';
import { DataSource } from 'typeorm';
import AppDataSource from './database/data-source';
import Server from './server';

jest.mock('./server');

describe('init Server', () => {
    let appDataSource: DataSource;
    beforeAll(async () => {
        appDataSource = await AppDataSource.initialize();
        await appDataSource.runMigrations();
    });

    afterAll(async () => {
        await appDataSource.dropDatabase();
        await appDataSource.destroy();
    });

    it('should init corretly', async () => {
        const mockedServer = new Server();
        mockedServer.init();
        expect(mockedServer.init).toBeCalledTimes(1);
    });
});
