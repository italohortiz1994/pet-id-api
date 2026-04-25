import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPetNews1777075400000 implements MigrationInterface {
  name = 'AddPetNews1777075400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "pet_news" (
        "id" SERIAL NOT NULL,
        "petId" uuid,
        "title" character varying NOT NULL,
        "summary" character varying,
        "content" text,
        "imageUrl" character varying,
        "category" character varying,
        "sourceName" character varying,
        "sourceUrl" character varying,
        "isPublished" boolean NOT NULL DEFAULT true,
        "publishedAt" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_pet_news_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_pet_news_petId" ON "pet_news" ("petId")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_pet_news_category" ON "pet_news" ("category")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_pet_news_publishedAt" ON "pet_news" ("publishedAt")',
    );
    await queryRunner.query(`
      ALTER TABLE "pet_news"
      ADD CONSTRAINT "FK_pet_news_petId"
      FOREIGN KEY ("petId") REFERENCES "pets"("id")
      ON DELETE SET NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet_news" DROP CONSTRAINT IF EXISTS "FK_pet_news_petId"',
    );
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_pet_news_publishedAt"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_pet_news_category"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_pet_news_petId"');
    await queryRunner.query('DROP TABLE IF EXISTS "pet_news"');
  }
}
