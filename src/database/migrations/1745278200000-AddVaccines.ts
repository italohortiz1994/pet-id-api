import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVaccines1745278200000 implements MigrationInterface {
  name = 'AddVaccines1745278200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "vaccines" (
        "id" SERIAL NOT NULL,
        "petId" character varying NOT NULL,
        "name" character varying NOT NULL,
        "applicationDate" TIMESTAMP NOT NULL,
        "nextDoseDate" TIMESTAMP,
        "veterinarianName" character varying,
        "clinicName" character varying,
        "notes" character varying,
        CONSTRAINT "PK_vaccines_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "vaccines"');
  }
}
