import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTestColumn1656102033200 implements MigrationInterface {
    name = 'AddedTestColumn1656102033200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "testColumn" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "testColumn"`);
    }

}
