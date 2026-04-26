import { MigrationInterface, QueryRunner } from 'typeorm';

export class NormalizePetSocialIds1777075800000 implements MigrationInterface {
  name = 'NormalizePetSocialIds1777075800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet_friendships" DROP CONSTRAINT IF EXISTS "FK_pet_friendships_requesterPetId"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_friendships" DROP CONSTRAINT IF EXISTS "FK_pet_friendships_addresseePetId"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_friendships" ALTER COLUMN "requesterPetId" TYPE character varying USING "requesterPetId"::text',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_friendships" ALTER COLUMN "addresseePetId" TYPE character varying USING "addresseePetId"::text',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet_friendships" ALTER COLUMN "requesterPetId" TYPE integer USING "requesterPetId"::integer',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_friendships" ALTER COLUMN "addresseePetId" TYPE integer USING "addresseePetId"::integer',
    );
  }
}
