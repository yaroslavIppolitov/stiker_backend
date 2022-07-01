import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedUserAddedAds1656359508098 implements MigrationInterface {
    name = 'ChangedUserAddedAds1656359508098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "UQ_9f16dbbf263b0af0f03637fa7b5" UNIQUE ("title"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ad" ("id" SERIAL NOT NULL, "title" character varying NOT NULL DEFAULT '', "description" character varying NOT NULL DEFAULT '', "cost" character varying NOT NULL DEFAULT '', "phone" character varying NOT NULL DEFAULT '', "address" character varying NOT NULL DEFAULT '', "publicDate" character varying NOT NULL DEFAULT '', "viewCount" integer NOT NULL DEFAULT '0', "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "isVisible" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_0193d5ef09746e88e9ea92c634d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ad_categories_category" ("adId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_704185fe6bf6548409f27d2d380" PRIMARY KEY ("adId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7d1b026aaa3509d517d40406c7" ON "ad_categories_category" ("adId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4133ec13e7085eddc16364bb1b" ON "ad_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "testColumn"`);
        await queryRunner.query(`ALTER TABLE "ad" ADD CONSTRAINT "FK_9ef75c41971255cd79702c9048a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ad_categories_category" ADD CONSTRAINT "FK_7d1b026aaa3509d517d40406c7d" FOREIGN KEY ("adId") REFERENCES "ad"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ad_categories_category" ADD CONSTRAINT "FK_4133ec13e7085eddc16364bb1bc" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad_categories_category" DROP CONSTRAINT "FK_4133ec13e7085eddc16364bb1bc"`);
        await queryRunner.query(`ALTER TABLE "ad_categories_category" DROP CONSTRAINT "FK_7d1b026aaa3509d517d40406c7d"`);
        await queryRunner.query(`ALTER TABLE "ad" DROP CONSTRAINT "FK_9ef75c41971255cd79702c9048a"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "testColumn" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4133ec13e7085eddc16364bb1b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d1b026aaa3509d517d40406c7"`);
        await queryRunner.query(`DROP TABLE "ad_categories_category"`);
        await queryRunner.query(`DROP TABLE "ad"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
