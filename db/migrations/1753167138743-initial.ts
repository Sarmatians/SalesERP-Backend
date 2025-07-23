import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1753167138743 implements MigrationInterface {
    name = 'Initial1753167138743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_03846b4bae9df80f19c76005a82"`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "inv_no" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "bill" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "discount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "paid_amount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "due_amount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "grand_total" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "vat" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "shipping_address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "order_type" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "delivery_charge" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "delivery_cost" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "delivery_cost" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "delivery_charge" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "order_type" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "shipping_address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "vat" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "grand_total" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "due_amount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "paid_amount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "discount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "bill" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "inv_no" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_03846b4bae9df80f19c76005a82" UNIQUE ("phone")`);
    }

}
