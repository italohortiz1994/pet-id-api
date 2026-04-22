import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHealthRecords1745276400000 implements MigrationInterface {
  name = 'AddHealthRecords1745276400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "health_records" (
        "id" SERIAL NOT NULL,
        "petId" character varying NOT NULL,
        "title" character varying NOT NULL,
        "description" character varying,
        "type" character varying NOT NULL,
        "date" TIMESTAMP,
        "fileUrl" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_health_records_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "health_records"');
  }
}
