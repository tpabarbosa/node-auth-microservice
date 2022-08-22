import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import UserRole from '../../enums/UserRoleEnum';

class AddRolesToUsersInUsersTable1660945557847 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('applications_users', [
            new TableColumn({
                name: 'role',
                type: 'varchar',
                isNullable: false,
                default: `'${UserRole.USER}'`,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('applications_users', 'role');
    }
}

export default AddRolesToUsersInUsersTable1660945557847;
