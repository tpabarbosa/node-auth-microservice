import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import UserRole from '../../enums/UserRoleEnum';

class AddAllowedRolesToCreateUsersInApplicationsTable1660944807642
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('applications', [
            new TableColumn({
                name: 'allowed_roles_to_create_users',
                type: 'varchar',
                isNullable: false,
                default: `'${UserRole.APP_ADMIN}'`,
            }),
            new TableColumn({
                name: 'default_role_new_users',
                type: 'varchar',
                isNullable: false,
                default: `'${UserRole.USER}'`,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(
            'applications',
            'allowed_roles_to_create_users'
        );
        await queryRunner.dropColumn('applications', 'default_role_new_users');
    }
}

export default AddAllowedRolesToCreateUsersInApplicationsTable1660944807642;
