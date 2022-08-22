import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

class AddIsVerifiedColumnToUsersTable1658691770323
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'applications_users',
            new TableColumn({
                name: 'is_verified',
                type: 'boolean',
                isNullable: false,
                default: false,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('applications_users', 'is_verified');
    }
}

export default AddIsVerifiedColumnToUsersTable1658691770323;
