import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1753679185773 implements MigrationInterface {
    name = 'Initial1753679185773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "Supplier_InvoiceNo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "Supplier_InvoiceNo"`);
    }

}
