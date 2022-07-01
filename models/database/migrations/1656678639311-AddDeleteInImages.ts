import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeleteInImages1656678639311 implements MigrationInterface {
    name = 'AddDeleteInImages1656678639311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" RENAME COLUMN "created" TO "deleted"`);
        await queryRunner.query(`ALTER TABLE "image" ALTER COLUMN "deleted" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "image" ALTER COLUMN "deleted" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" ALTER COLUMN "deleted" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "image" ALTER COLUMN "deleted" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "image" RENAME COLUMN "deleted" TO "created"`);
    }

}
