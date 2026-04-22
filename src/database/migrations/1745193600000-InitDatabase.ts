import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1745193600000 implements MigrationInterface {
  name = 'InitDatabase1745193600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "pets" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying NOT NULL,
        "breed" character varying NOT NULL,
        "age" integer NOT NULL,
        "gender" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_pets_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "pet_identities" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "publicId" character varying NOT NULL,
        "petId" uuid NOT NULL,
        "isPublic" boolean NOT NULL DEFAULT true,
        "status" character varying NOT NULL DEFAULT 'ACTIVE',
        "qrCodeUrl" character varying,
        "publicUrl" character varying,
        "showOwnerContact" boolean NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_pet_identities_publicId" UNIQUE ("publicId"),
        CONSTRAINT "PK_pet_identities_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "pet_identities"');
    await queryRunner.query('DROP TABLE IF EXISTS "pets"');
  }
}
