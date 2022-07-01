import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifiedImages1656621593539 implements MigrationInterface {
    name = 'ModifiedImages1656621593539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "link" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8fd453dcf8731cc181d4837b991" UNIQUE ("link"), CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "UQ_18f0117606cc8da6730b3e82f81"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "link"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ADD "link" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "UQ_18f0117606cc8da6730b3e82f81" UNIQUE ("link")`);
        await queryRunner.query(`ALTER TABLE "session" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "image"`);
    }

}
