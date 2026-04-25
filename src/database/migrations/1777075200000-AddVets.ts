import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVets1777075200000 implements MigrationInterface {
  name = 'AddVets1777075200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "vets" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "crmv" character varying NOT NULL,
        "specialty" character varying NOT NULL DEFAULT 'Clinica geral',
        "clinicName" character varying,
        "phone" character varying,
        "address" character varying,
        "status" character varying NOT NULL DEFAULT 'active',
        "notes" character varying,
        "isVerified" boolean NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_vets_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_vets_email" UNIQUE ("email")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "vets"');
  }
}
