import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedSesssionsAndImagesModifiedUsersAndAds1656620662222 implements MigrationInterface {
    name = 'AddedSesssionsAndImagesModifiedUsersAndAds1656620662222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_232f8e85d7633bd6ddfad421696" UNIQUE ("token"), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "UQ_232f8e85d7633bd6ddfad421696"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "token" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "UQ_232f8e85d7633bd6ddfad421696" UNIQUE ("token")`);
        await queryRunner.query(`ALTER TABLE "session" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "godMode" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "session" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "link" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "UQ_18f0117606cc8da6730b3e82f81" UNIQUE ("link")`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "UQ_18f0117606cc8da6730b3e82f81"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "link"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "godMode"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "UQ_232f8e85d7633bd6ddfad421696"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "session" ADD "token" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "UQ_232f8e85d7633bd6ddfad421696" UNIQUE ("token")`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
