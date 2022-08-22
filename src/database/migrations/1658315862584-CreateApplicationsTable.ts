import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateApplicationsTable1658315862584 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'applications',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: false,
                        default:
                            process.env.NODE_ENV !== 'test'
                                ? 'now()'
                                : 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: false,
                        default:
                            process.env.NODE_ENV !== 'test'
                                ? 'now()'
                                : 'CURRENT_TIMESTAMP',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('applications');
    }
}

export default CreateApplicationsTable1658315862584;
