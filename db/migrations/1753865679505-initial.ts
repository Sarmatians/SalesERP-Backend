import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1753865679505 implements MigrationInterface {
    name = 'Initial1753865679505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "Supplier_InvoiceNo" character varying`);
        await queryRunner.query(`ALTER TYPE "public"."user_roles_enum" RENAME TO "user_roles_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_roles_enum" AS ENUM('admin', 'user', 'manager', 'salesperson')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" TYPE "public"."user_roles_enum"[] USING "roles"::"text"::"public"."user_roles_enum"[]`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" SET DEFAULT '{user}'`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_roles_enum_old" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" TYPE "public"."user_roles_enum_old"[] USING "roles"::"text"::"public"."user_roles_enum_old"[]`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" SET DEFAULT '{user}'`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_roles_enum_old" RENAME TO "user_roles_enum"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "Supplier_InvoiceNo"`);
    }

}
