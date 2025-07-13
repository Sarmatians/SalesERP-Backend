import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1752384109540 implements MigrationInterface {
    name = 'Initial1752384109540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "add_date" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "add_date"`);
    }

}
