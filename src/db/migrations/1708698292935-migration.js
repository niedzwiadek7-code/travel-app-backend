const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migration1708698292935 {
    name = 'Migration1708698292935'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "travel_app"."role_entity_users_user_entity" DROP CONSTRAINT "FK_42cf3453eccbf7f761b3468253f"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."user_entity_roles_role_entity" DROP CONSTRAINT "FK_63f06698e4071b610eca2da812c"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."role_entity_users_user_entity" ADD CONSTRAINT "FK_42cf3453eccbf7f761b3468253f" FOREIGN KEY ("userEntityId") REFERENCES "travel_app"."user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "travel_app"."user_entity_roles_role_entity" ADD CONSTRAINT "FK_63f06698e4071b610eca2da812c" FOREIGN KEY ("roleEntityId") REFERENCES "travel_app"."role_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "travel_app"."user_entity_roles_role_entity" DROP CONSTRAINT "FK_63f06698e4071b610eca2da812c"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."role_entity_users_user_entity" DROP CONSTRAINT "FK_42cf3453eccbf7f761b3468253f"`);
        await queryRunner.query(`ALTER TABLE "travel_app"."user_entity_roles_role_entity" ADD CONSTRAINT "FK_63f06698e4071b610eca2da812c" FOREIGN KEY ("roleEntityId") REFERENCES "travel_app"."role_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "travel_app"."role_entity_users_user_entity" ADD CONSTRAINT "FK_42cf3453eccbf7f761b3468253f" FOREIGN KEY ("userEntityId") REFERENCES "travel_app"."user_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
}
