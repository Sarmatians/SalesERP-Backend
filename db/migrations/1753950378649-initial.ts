import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1753950378649 implements MigrationInterface {
    name = 'Initial1753950378649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supplier_payment" ("id" SERIAL NOT NULL, "paymentMethod" character varying(100), "paidAmount" numeric(10,2), "notes" character varying(255), "supplierInvoiceNo" character varying(255), "paidAt" TIMESTAMP NOT NULL DEFAULT now(), "supplierId" integer NOT NULL, CONSTRAINT "PK_69c70222c0d92f391ecc1efd5f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "supplier_payment" ADD CONSTRAINT "FK_8a61de1de4c106572a7f464bf64" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier_payment" DROP CONSTRAINT "FK_8a61de1de4c106572a7f464bf64"`);
        await queryRunner.query(`DROP TABLE "supplier_payment"`);
    }

}
