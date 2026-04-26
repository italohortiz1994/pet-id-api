import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPetNewsLikesByUser1777075700000
  implements MigrationInterface
{
  name = 'AddPetNewsLikesByUser1777075700000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "pet_news_likes" (
        "id" SERIAL NOT NULL,
        "newsId" integer NOT NULL,
        "userId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_pet_news_likes_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_pet_news_likes_news_user" UNIQUE ("newsId", "userId")
      )
    `);
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_pet_news_likes_newsId" ON "pet_news_likes" ("newsId")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_pet_news_likes_userId" ON "pet_news_likes" ("userId")',
    );
    await queryRunner.query(`
      ALTER TABLE "pet_news_likes"
      ADD CONSTRAINT "FK_pet_news_likes_newsId"
      FOREIGN KEY ("newsId") REFERENCES "pet_news"("id")
      ON DELETE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "pet_news_likes"
      ADD CONSTRAINT "FK_pet_news_likes_userId"
      FOREIGN KEY ("userId") REFERENCES "users"("id")
      ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet_news_likes" DROP CONSTRAINT IF EXISTS "FK_pet_news_likes_userId"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_news_likes" DROP CONSTRAINT IF EXISTS "FK_pet_news_likes_newsId"',
    );
    await queryRunner.query('DROP TABLE IF EXISTS "pet_news_likes"');
  }
}
