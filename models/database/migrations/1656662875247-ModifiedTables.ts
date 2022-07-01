import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifiedTables1656662875247 implements MigrationInterface {
    name = 'ModifiedTables1656662875247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "deleted" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "image" ADD "adId" integer`);
        await queryRunner.query(`ALTER TABLE "ad" DROP COLUMN "publicDate"`);
        await queryRunner.query(`ALTER TABLE "ad" ADD "publicDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_76327a1ff9418b2cf6624d8b976" FOREIGN KEY ("adId") REFERENCES "ad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_76327a1ff9418b2cf6624d8b976"`);
        await queryRunner.query(`ALTER TABLE "ad" DROP COLUMN "publicDate"`);
        await queryRunner.query(`ALTER TABLE "ad" ADD "publicDate" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "adId"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "deleted"`);
    }

}
