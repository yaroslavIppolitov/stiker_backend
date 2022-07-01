import { MigrationInterface, QueryRunner } from "typeorm";

export class EditedImages1656674205702 implements MigrationInterface {
    name = 'EditedImages1656674205702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_76327a1ff9418b2cf6624d8b976"`);
        await queryRunner.query(`CREATE TABLE "image_ads_ad" ("imageId" integer NOT NULL, "adId" integer NOT NULL, CONSTRAINT "PK_dd58e400c072b52db7a83a00eed" PRIMARY KEY ("imageId", "adId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5994cd0107dc716fc3cd8430a1" ON "image_ads_ad" ("imageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_28e349bb314303646fd4d49565" ON "image_ads_ad" ("adId") `);
        await queryRunner.query(`CREATE TABLE "ad_images_image" ("adId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_22c450f216dd66ff2f1a62adf76" PRIMARY KEY ("adId", "imageId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf228ff0421ce3416328544ee3" ON "ad_images_image" ("adId") `);
        await queryRunner.query(`CREATE INDEX "IDX_216f75a68e0ac3d601d818f51b" ON "ad_images_image" ("imageId") `);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "adId"`);
        await queryRunner.query(`ALTER TABLE "image_ads_ad" ADD CONSTRAINT "FK_5994cd0107dc716fc3cd8430a12" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "image_ads_ad" ADD CONSTRAINT "FK_28e349bb314303646fd4d495650" FOREIGN KEY ("adId") REFERENCES "ad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ad_images_image" ADD CONSTRAINT "FK_cf228ff0421ce3416328544ee3c" FOREIGN KEY ("adId") REFERENCES "ad"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ad_images_image" ADD CONSTRAINT "FK_216f75a68e0ac3d601d818f51b2" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad_images_image" DROP CONSTRAINT "FK_216f75a68e0ac3d601d818f51b2"`);
        await queryRunner.query(`ALTER TABLE "ad_images_image" DROP CONSTRAINT "FK_cf228ff0421ce3416328544ee3c"`);
        await queryRunner.query(`ALTER TABLE "image_ads_ad" DROP CONSTRAINT "FK_28e349bb314303646fd4d495650"`);
        await queryRunner.query(`ALTER TABLE "image_ads_ad" DROP CONSTRAINT "FK_5994cd0107dc716fc3cd8430a12"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "adId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_216f75a68e0ac3d601d818f51b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf228ff0421ce3416328544ee3"`);
        await queryRunner.query(`DROP TABLE "ad_images_image"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_28e349bb314303646fd4d49565"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5994cd0107dc716fc3cd8430a1"`);
        await queryRunner.query(`DROP TABLE "image_ads_ad"`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_76327a1ff9418b2cf6624d8b976" FOREIGN KEY ("adId") REFERENCES "ad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
