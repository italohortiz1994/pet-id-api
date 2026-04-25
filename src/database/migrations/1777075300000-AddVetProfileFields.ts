import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVetProfileFields1777075300000 implements MigrationInterface {
  name = 'AddVetProfileFields1777075300000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "vets"
        ADD COLUMN IF NOT EXISTS "specialty" character varying NOT NULL DEFAULT 'Clinica geral',
        ADD COLUMN IF NOT EXISTS "address" character varying,
        ADD COLUMN IF NOT EXISTS "status" character varying NOT NULL DEFAULT 'active',
        ADD COLUMN IF NOT EXISTS "notes" character varying,
        ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "vets"
        DROP COLUMN IF EXISTS "updatedAt",
        DROP COLUMN IF EXISTS "notes",
        DROP COLUMN IF EXISTS "status",
        DROP COLUMN IF EXISTS "address",
        DROP COLUMN IF EXISTS "specialty"
    `);
  }
}
