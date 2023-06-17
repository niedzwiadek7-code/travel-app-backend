import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1687011744067 implements MigrationInterface {
    name = 'Initial1687011744067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`place_entity\` CHANGE \`longitude\` \`longitude\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`place_entity\` CHANGE \`latitude\` \`latitude\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`element_travel_entity\` DROP FOREIGN KEY \`FK_0f1509b9323cdf5ea6c5bec08df\``);
        await queryRunner.query(`ALTER TABLE \`element_travel_entity\` DROP FOREIGN KEY \`FK_a7f0ef67ae13c818a9291661f9e\``);
        await queryRunner.query(`ALTER TABLE \`element_travel_entity\` CHANGE \`travelId\` \`travelId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`element_travel_entity\` CHANGE \`activityId\` \`activityId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`element_travel_photo_entity\` DROP FOREIGN KEY \`FK_cbcfaa9ed947c06052b8336675c\``);
        await queryRunner.query(`ALTER TABLE \`element_travel_photo_entity\` CHANGE \`elementTravelId\` \`elementTravelId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`element_travel_instance_entity\` DROP FOREIGN KEY \`FK_926900e37eafa8c2deafc80c4d7\``);
        await queryRunner.query(`ALTER TABLE \`element_travel_instance_entity\` DROP FOREIGN KEY \`FK_4e9f5c0b5e3df24af79b9561390\``);
        await queryRunner.query(`ALTER TABLE \`element_travel_instance_entity\` CHANGE \`dateRangeId\` \`dateRangeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`element_travel_instance_entity\` CHANGE \`travelInstanceId\` \`travelInstanceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`travel_instance_entity\` DROP FOREIGN KEY \`FK_7dddab5bf81b05aa5424b4c8bc4\``);
        await queryRunner.query(`ALTER TABLE \`travel_instance_entity\` DROP FOREIGN KEY \`FK_43dc6b7bdc9f549c07cb1572e19\``);
        await queryRunner.query(`ALTER TABLE \`travel_instance_entity\` CHANGE \`travelRecipeId\` \`travelRecipeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`travel_instance_entity\` CHANGE \`dateRangeId\` \`dateRangeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`travel_recipe_entity\` DROP FOREIGN KEY \`FK_51ef974933f48f1cab825efec8c\``);
        await queryRunner.query(`ALTER TABLE \`travel_recipe_entity\` DROP FOREIGN KEY \`FK_9d75ef445a71a8e96516ea88a29\``);
        await queryRunner.query(`ALTER TABLE \`travel_recipe_entity\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`travel_recipe_entity\` CHANGE \`placeId\` \`placeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_95ab8e7157a5bb4bc0e51aefdd2\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`question_entity\` DROP FOREIGN KEY \`FK_f332b9dac22cf4b48c10139e71a\``);
        await queryRunner.query(`ALTER TABLE \`question_entity\` DROP FOREIGN KEY \`FK_1f1917a088f01f0cdbb7cf90829\``);
        await queryRunner.query(`ALTER TABLE \`question_entity\` CHANGE \`activityId\` \`activityId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`question_entity\` CHANGE \`authorId\` \`authorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`category_rating_entity\` DROP FOREIGN KEY \`FK_6c65b1a3a4f6ea5904a684a65a0\``);
        await queryRunner.query(`ALTER TABLE \`category_rating_entity\` CHANGE \`ratingId\` \`ratingId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`rating_entity\` DROP FOREIGN KEY \`FK_1f441fa9463732a1486674087ac\``);
        await queryRunner.query(`ALTER TABLE \`rating_entity\` CHANGE \`activityId\` \`activityId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`price_entity\` DROP FOREIGN KEY \`FK_86eb55926363db21706185beac4\``);
        await queryRunner.query(`ALTER TABLE \`price_entity\` CHANGE \`activityId\` \`activityId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`activity_parameter_entity\` DROP FOREIGN KEY \`FK_237695feda31ed013fa6549da13\``);
        await queryRunner.query(`ALTER TABLE \`activity_parameter_entity\` CHANGE \`activityTypeParameterId\` \`activityTypeParameterId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`activity_type_parameter_entity\` DROP FOREIGN KEY \`FK_eb71e8144af9001f872034f15d3\``);
        await queryRunner.query(`ALTER TABLE \`activity_type_parameter_entity\` CHANGE \`activityTypeId\` \`activityTypeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`element_travel_entity\` ADD CONSTRAINT \`FK_0f1509b9323cdf5ea6c5bec08df\` FOREIGN KEY (\`travelId\`) REFERENCES \`travel_recipe_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`element_travel_entity\` ADD CONSTRAINT \`FK_a7f0ef67ae13c818a9291661f9e\` FOREIGN KEY (\`activityId\`) REFERENCES \`activity_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`element_travel_photo_entity\` ADD CONSTRAINT \`FK_cbcfaa9ed947c06052b8336675c\` FOREIGN KEY (\`elementTravelId\`) REFERENCES \`element_travel_instance_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`element_travel_instance_entity\` ADD CONSTRAINT \`FK_926900e37eafa8c2deafc80c4d7\` FOREIGN KEY (\`dateRangeId\`) REFERENCES \`date_range_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`element_travel_instance_entity\` ADD CONSTRAINT \`FK_4e9f5c0b5e3df24af79b9561390\` FOREIGN KEY (\`travelInstanceId\`) REFERENCES \`travel_instance_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travel_instance_entity\` ADD CONSTRAINT \`FK_7dddab5bf81b05aa5424b4c8bc4\` FOREIGN KEY (\`travelRecipeId\`) REFERENCES \`travel_recipe_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travel_instance_entity\` ADD CONSTRAINT \`FK_43dc6b7bdc9f549c07cb1572e19\` FOREIGN KEY (\`dateRangeId\`) REFERENCES \`date_range_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travel_recipe_entity\` ADD CONSTRAINT \`FK_51ef974933f48f1cab825efec8c\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travel_recipe_entity\` ADD CONSTRAINT \`FK_9d75ef445a71a8e96516ea88a29\` FOREIGN KEY (\`placeId\`) REFERENCES \`place_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_95ab8e7157a5bb4bc0e51aefdd2\` FOREIGN KEY (\`roleId\`) REFERENCES \`user_role_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question_entity\` ADD CONSTRAINT \`FK_f332b9dac22cf4b48c10139e71a\` FOREIGN KEY (\`activityId\`) REFERENCES \`activity_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question_entity\` ADD CONSTRAINT \`FK_1f1917a088f01f0cdbb7cf90829\` FOREIGN KEY (\`authorId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_rating_entity\` ADD CONSTRAINT \`FK_6c65b1a3a4f6ea5904a684a65a0\` FOREIGN KEY (\`ratingId\`) REFERENCES \`rating_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rating_entity\` ADD CONSTRAINT \`FK_1f441fa9463732a1486674087ac\` FOREIGN KEY (\`activityId\`) REFERENCES \`activity_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`price_entity\` ADD CONSTRAINT \`FK_86eb55926363db21706185beac4\` FOREIGN KEY (\`activityId\`) REFERENCES \`activity_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_parameter_entity\` ADD CONSTRAINT \`FK_237695feda31ed013fa6549da13\` FOREIGN KEY (\`activityTypeParameterId\`) REFERENCES \`activity_type_parameter_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_type_parameter_entity\` ADD CONSTRAINT \`FK_eb71e8144af9001f872034f15d3\` FOREIGN KEY (\`activityTypeId\`) REFERENCES \`activity_type_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_type_parameter_entity\` DROP FOREIGN KEY \`FK_eb71e8144af9001f872034f15d3\``);
        await queryRunner.query(`ALTER TABLE \`activity_parameter_entity\` DROP FOREIGN KEY \`FK_237695feda31ed013fa6549da13\``);
        await queryRunner.query(`ALTER TABLE \`price_entity\` DROP FOREIGN KEY \`FK_86eb55926363db21706185beac4\``);
        await queryRunner.query(`ALTER TABLE \`rating_entity\` DROP FOREIGN KEY \`FK_1f441fa9463732a1486674087ac\``);
        await queryRunner.query(`ALTER TABLE \`category_rating_entity\` DROP FOREIGN KEY \`FK_6c65b1a3a4f6ea5904a684a65a0\``);
        await queryRunner.query(`ALTER TABLE \`question_entity\` DROP FOREIGN KEY \`FK_1f1917a088f01f0cdbb7cf90829\``);
        await queryRunner.query(`ALTER TABLE \`question_entity\` DROP FOREIGN KEY \`FK_f332b9dac22cf4b48c10139e71a\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_95ab8e7157a5bb4bc0e51aefdd2\``);
        await queryRunner.query(`ALTER TABLE \`travel_recipe_entity\` DROP FOREIGN KEY \`FK_9d75ef445a71a8e96516ea88a29\``);
        await queryRunner.query(`ALTER TABLE \`travel_recipe_entity\` DROP FOREIGN KEY \`FK_51ef974933f48f1cab825efec8c\``);
        await queryRunner.query(`ALTER TABLE \`travel_instance_entity\` DROP FOREIGN KEY \`FK_43dc6b7bdc9f549c07cb1572e19\``);
        await queryRunner.query(`ALTER TABLE \`travel_instance_entity\` DROP FOREIGN KEY \`FK_7dddab5bf81b05aa5424b4c8bc4\``);
        await queryRunner.query(`ALTER TABLE \`element_travel_instance_entity\` DROP FOREIGN KEY \`FK_4e9f5c0b5e3df24af79b9561390\``);
        await queryRunner.query(`ALTER TABLE \`element_travel_instance_entity\` DROP FOREIGN KEY \`FK_926900e37eafa8c2deafc80c4d7\``);
        await queryRunner.query(`ALTER TABLE \`element_travel_photo_entity\` DROP FOREIGN KEY \`FK_cbcfaa9ed947c06052b8336675c\``);
        await queryRunner.query(`ALTER TABLE \`element_travel_entity\` DROP FOREIGN KEY \`FK_a7f0ef67ae13c818a9291661f9e\``);
        await queryRunner.query(`ALTER TABLE \`element_travel_entity\` DROP FOREIGN KEY \`FK_0f1509b9323cdf5ea6c5bec08df\``);
        await queryRunner.query(`ALTER TABLE \`activity_type_parameter_entity\` CHANGE \`activityTypeId\` \`activityTypeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`activity_type_parameter_entity\` ADD CONSTRAINT \`FK_eb71e8144af9001f872034f15d3\` FOREIGN KEY (\`activityTypeId\`) REFERENCES \`activity_type_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_parameter_entity\` CHANGE \`activityTypeParameterId\` \`activityTypeParameterId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`activity_parameter_entity\` ADD CONSTRAINT \`FK_237695feda31ed013fa6549da13\` FOREIGN KEY (\`activityTypeParameterId\`) REFERENCES \`activity_type_parameter_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`price_entity\` CHANGE \`activityId\` \`activityId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`price_entity\` ADD CONSTRAINT \`FK_86eb55926363db21706185beac4\` FOREIGN KEY (\`activityId\`) REFERENCES \`activity_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rating_entity\` CHANGE \`activityId\` \`activityId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`rating_entity\` ADD CONSTRAINT \`FK_1f441fa9463732a1486674087ac\` FOREIGN KEY (\`activityId\`) REFERENCES \`activity_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_rating_entity\` CHANGE \`ratingId\` \`ratingId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category_rating_entity\` ADD CONSTRAINT \`FK_6c65b1a3a4f6ea5904a684a65a0\` FOREIGN KEY (\`ratingId\`) REFERENCES \`rating_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question_entity\` CHANGE \`authorId\` \`authorId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question_entity\` CHANGE \`activityId\` \`activityId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question_entity\` ADD CONSTRAINT \`FK_1f1917a088f01f0cdbb7cf90829\` FOREIGN KEY (\`authorId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question_entity\` ADD CONSTRAINT \`FK_f332b9dac22cf4b48c10139e71a\` FOREIGN KEY (\`activityId\`) REFERENCES \`activity_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_95ab8e7157a5bb4bc0e51aefdd2\` FOREIGN KEY (\`roleId\`) REFERENCES \`user_role_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travel_recipe_entity\` CHANGE \`placeId\` \`placeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`travel_recipe_entity\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`travel_recipe_entity\` ADD CONSTRAINT \`FK_9d75ef445a71a8e96516ea88a29\` FOREIGN KEY (\`placeId\`) REFERENCES \`place_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travel_recipe_entity\` ADD CONSTRAINT \`FK_51ef974933f48f1cab825efec8c\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travel_instance_entity\` CHANGE \`dateRangeId\` \`dateRangeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`travel_instance_entity\` CHANGE \`travelRecipeId\` \`travelRecipeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`travel_instance_entity\` ADD CONSTRAINT \`FK_43dc6b7bdc9f549c07cb1572e19\` FOREIGN KEY (\`dateRangeId\`) REFERENCES \`date_range_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`travel_instance_entity\` ADD CONSTRAINT \`FK_7dddab5bf81b05aa5424b4c8bc4\` FOREIGN KEY (\`travelRecipeId\`) REFERENCES \`travel_recipe_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`element_travel_instance_entity\` CHANGE \`travelInstanceId\` \`travelInstanceId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`element_travel_instance_entity\` CHANGE \`dateRangeId\` \`dateRangeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`element_travel_instance_entity\` ADD CONSTRAINT \`FK_4e9f5c0b5e3df24af79b9561390\` FOREIGN KEY (\`travelInstanceId\`) REFERENCES \`travel_instance_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`element_travel_instance_entity\` ADD CONSTRAINT \`FK_926900e37eafa8c2deafc80c4d7\` FOREIGN KEY (\`dateRangeId\`) REFERENCES \`date_range_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`element_travel_photo_entity\` CHANGE \`elementTravelId\` \`elementTravelId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`element_travel_photo_entity\` ADD CONSTRAINT \`FK_cbcfaa9ed947c06052b8336675c\` FOREIGN KEY (\`elementTravelId\`) REFERENCES \`element_travel_instance_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`element_travel_entity\` CHANGE \`activityId\` \`activityId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`element_travel_entity\` CHANGE \`travelId\` \`travelId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`element_travel_entity\` ADD CONSTRAINT \`FK_a7f0ef67ae13c818a9291661f9e\` FOREIGN KEY (\`activityId\`) REFERENCES \`activity_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`element_travel_entity\` ADD CONSTRAINT \`FK_0f1509b9323cdf5ea6c5bec08df\` FOREIGN KEY (\`travelId\`) REFERENCES \`travel_recipe_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`place_entity\` CHANGE \`latitude\` \`latitude\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`place_entity\` CHANGE \`longitude\` \`longitude\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
