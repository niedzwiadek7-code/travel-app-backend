const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migration1739996086567 {
    name = 'Migration1739996086567'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "travel_app"."rating" DROP COLUMN "sharePhotos"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."photo" ADD "isShared" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "travel_app"."photo" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "travel_app"."photo" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "travel_app"."photo" ADD "deleteAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "travel_app"."rating" ADD "rating" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "travel_app"."rating" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "travel_app"."price" ALTER COLUMN "startDate" SET DEFAULT '"2025-02-19T20:14:49.057Z"'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "travel_app"."price" ALTER COLUMN "startDate" SET DEFAULT '2025-02-13'`);
        await queryRunner.query(`ALTER TABLE "travel_app"."rating" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."rating" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."photo" DROP COLUMN "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."photo" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."photo" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."photo" DROP COLUMN "isShared"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."rating" ADD "sharePhotos" boolean NOT NULL DEFAULT false`);
    }
}
