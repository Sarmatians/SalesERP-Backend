import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1754467262185 implements MigrationInterface {
    name = 'Initial1754467262185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_entry" ADD "createdQuantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_entry" DROP COLUMN "createdQuantity"`);
    }

}
