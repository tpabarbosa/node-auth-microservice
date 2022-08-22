/* eslint-disable global-require */
import AppDataSource from './database/data-source';
import Server from './server';
import bootstrap from './index';

jest.mock('./server');

describe('init Server', () => {
    afterEach(async () => {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    });

    it('should init correctly', async () => {
        const spyDataSource = jest.spyOn(AppDataSource, 'initialize');
        bootstrap();
        const dataSource = await spyDataSource.mock.results[0].value;
        expect(spyDataSource).toHaveBeenCalledTimes(1);
        expect(dataSource.isInitialized).toBe(true);
        expect(Server).toHaveBeenCalled();
        spyDataSource.mockRestore();
    });

    it('should throw Error when database is not initialized', async () => {
        const spyDataSource = jest
            .spyOn(AppDataSource, 'initialize')
            .mockRejectedValue(new Error('Connection Error'));

        const consoleErrorFn = jest
            .spyOn(console, 'error')
            .mockImplementation(() => jest.fn());

        bootstrap();
        await expect(spyDataSource).rejects.toThrowError('Connection Error');
        expect(consoleErrorFn).toHaveBeenCalledTimes(2);
        expect(consoleErrorFn.mock.calls[0][0]).toBe(
            'Database initialization error:'
        );
        expect(Server).toHaveBeenCalledTimes(0);
    });
});
