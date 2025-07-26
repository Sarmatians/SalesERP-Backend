import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1753355347924 implements MigrationInterface {
    name = 'Initial1753355347924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "size" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "size"`);
    }

}
