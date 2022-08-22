import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

class AddApplicantionForeingKeyToUsers1658579747680
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'applications_users',
            new TableForeignKey({
                columnNames: ['application_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'applications',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('applications_users');
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('application_id') !== -1
        );
        await queryRunner.dropForeignKey('applications_users', foreignKey);
    }
}

export default AddApplicantionForeingKeyToUsers1658579747680;
