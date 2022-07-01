import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedDataFormatForPublishDate1656680713384 implements MigrationInterface {
    name = 'ChangedDataFormatForPublishDate1656680713384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "publicDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "publicDate" SET NOT NULL`);
    }

}
