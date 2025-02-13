const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migration1739433057846 {
    name = 'Migration1739433057846'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "travel_app"."travel_instance" ADD "deleteAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "travel_app"."rating" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "travel_app"."rating" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "travel_app"."travel_recipe" ADD "deleteAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "travel_app"."price" ALTER COLUMN "startDate" SET DEFAULT '"2025-02-13T07:51:00.277Z"'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "travel_app"."price" ALTER COLUMN "startDate" SET DEFAULT '2024-03-23'`);
        await queryRunner.query(`ALTER TABLE "travel_app"."travel_recipe" DROP COLUMN "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."rating" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."rating" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."travel_instance" DROP COLUMN "deleteAt"`);
    }
}
