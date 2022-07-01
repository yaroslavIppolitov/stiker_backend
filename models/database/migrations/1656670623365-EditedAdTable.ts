import { MigrationInterface, QueryRunner } from "typeorm";

export class EditedAdTable1656670623365 implements MigrationInterface {
    name = 'EditedAdTable1656670623365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" DROP COLUMN "publicDate"`);
        await queryRunner.query(`ALTER TABLE "ad" ADD "publicDate" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" DROP COLUMN "publicDate"`);
        await queryRunner.query(`ALTER TABLE "ad" ADD "publicDate" TIMESTAMP NOT NULL`);
    }

}
