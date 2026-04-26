import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPetOwnersAndNewsLikes1777075600000
  implements MigrationInterface
{
  name = 'AddPetOwnersAndNewsLikes1777075600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "pets" ADD COLUMN IF NOT EXISTS "userId" uuid');
    await queryRunner.query(
      'ALTER TABLE "pet_news" ADD COLUMN IF NOT EXISTS "likesCount" integer NOT NULL DEFAULT 0',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_pets_userId" ON "pets" ("userId")',
    );
    await queryRunner.query(`
      ALTER TABLE "pets"
      ADD CONSTRAINT "FK_pets_userId"
      FOREIGN KEY ("userId") REFERENCES "users"("id")
      ON DELETE SET NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pets" DROP CONSTRAINT IF EXISTS "FK_pets_userId"',
    );
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_pets_userId"');
    await queryRunner.query('ALTER TABLE "pet_news" DROP COLUMN IF EXISTS "likesCount"');
    await queryRunner.query('ALTER TABLE "pets" DROP COLUMN IF EXISTS "userId"');
  }
}
