import { MigrationInterface, QueryRunner } from 'typeorm';
import { randomUUID } from 'crypto';

import config from '../../config';
import UserRole from '../../enums/UserRoleEnum';

import PasswordHelper from '../../helpers/PasswordHelper';

const EMAIL = config.AUTH_SERVICE_EMAIL;
const PASSWORD = PasswordHelper.encrypt(config.AUTH_SERVICE_PASSWORD);
const APP_ID = randomUUID();
const USER_ID = randomUUID();

class InputServiceApplicationAndServiceAdmin1661016043507
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO applications (id, name, email) VALUES ('${APP_ID}', 'Auth Service', '${EMAIL}')`
        );

        await queryRunner.query(
            `INSERT INTO applications_users (id, name, email, password, application_id, role) VALUES ('${USER_ID}','Auth Service Admin', '${EMAIL}', '${PASSWORD}', '${APP_ID}', '${UserRole.SERVICE_ADMIN}')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM applications_users WHERE email = '${EMAIL}'`
        );
        await queryRunner.query(
            `DELETE FROM applications WHERE email = '${EMAIL}'`
        );
    }
}

export default InputServiceApplicationAndServiceAdmin1661016043507;
