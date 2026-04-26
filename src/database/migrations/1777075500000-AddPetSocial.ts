import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPetSocial1777075500000 implements MigrationInterface {
  name = 'AddPetSocial1777075500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "pet_news_images" (
        "id" SERIAL NOT NULL,
        "newsId" integer NOT NULL,
        "imageUrl" character varying NOT NULL,
        "caption" character varying,
        "sortOrder" integer NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_pet_news_images_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "pet_comments" (
        "id" SERIAL NOT NULL,
        "newsId" integer NOT NULL,
        "petId" integer,
        "userId" uuid,
        "content" text NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_pet_comments_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "pet_friendships" (
        "id" SERIAL NOT NULL,
        "requesterPetId" integer NOT NULL,
        "addresseePetId" integer NOT NULL,
        "status" character varying NOT NULL DEFAULT 'pending',
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_pet_friendships_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_pet_friendships_pair" UNIQUE ("requesterPetId", "addresseePetId")
      )
    `);

    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_pet_news_images_newsId" ON "pet_news_images" ("newsId")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_pet_comments_newsId" ON "pet_comments" ("newsId")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_pet_comments_petId" ON "pet_comments" ("petId")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_pet_friendships_requesterPetId" ON "pet_friendships" ("requesterPetId")',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_pet_friendships_addresseePetId" ON "pet_friendships" ("addresseePetId")',
    );

    await queryRunner.query(`
      ALTER TABLE "pet_news_images"
      ADD CONSTRAINT "FK_pet_news_images_newsId"
      FOREIGN KEY ("newsId") REFERENCES "pet_news"("id")
      ON DELETE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "pet_comments"
      ADD CONSTRAINT "FK_pet_comments_newsId"
      FOREIGN KEY ("newsId") REFERENCES "pet_news"("id")
      ON DELETE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "pet_comments"
      ADD CONSTRAINT "FK_pet_comments_petId"
      FOREIGN KEY ("petId") REFERENCES "pets"("id")
      ON DELETE SET NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "pet_comments"
      ADD CONSTRAINT "FK_pet_comments_userId"
      FOREIGN KEY ("userId") REFERENCES "users"("id")
      ON DELETE SET NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "pet_friendships"
      ADD CONSTRAINT "FK_pet_friendships_requesterPetId"
      FOREIGN KEY ("requesterPetId") REFERENCES "pets"("id")
      ON DELETE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "pet_friendships"
      ADD CONSTRAINT "FK_pet_friendships_addresseePetId"
      FOREIGN KEY ("addresseePetId") REFERENCES "pets"("id")
      ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet_friendships" DROP CONSTRAINT IF EXISTS "FK_pet_friendships_addresseePetId"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_friendships" DROP CONSTRAINT IF EXISTS "FK_pet_friendships_requesterPetId"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_comments" DROP CONSTRAINT IF EXISTS "FK_pet_comments_userId"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_comments" DROP CONSTRAINT IF EXISTS "FK_pet_comments_petId"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_comments" DROP CONSTRAINT IF EXISTS "FK_pet_comments_newsId"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet_news_images" DROP CONSTRAINT IF EXISTS "FK_pet_news_images_newsId"',
    );
    await queryRunner.query('DROP TABLE IF EXISTS "pet_friendships"');
    await queryRunner.query('DROP TABLE IF EXISTS "pet_comments"');
    await queryRunner.query('DROP TABLE IF EXISTS "pet_news_images"');
  }
}
