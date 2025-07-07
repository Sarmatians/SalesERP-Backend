import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1751862191109 implements MigrationInterface {
    name = 'Initial1751862191109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_roles_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" "public"."user_roles_enum" array NOT NULL DEFAULT '{user}', "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying, "email" character varying, "phone" character varying NOT NULL, "address" character varying, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "inv_no" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "bill" numeric NOT NULL, "discount" numeric NOT NULL, "paid_amount" numeric NOT NULL, "due_amount" numeric NOT NULL, "grand_total" numeric NOT NULL, "status" character varying NOT NULL, "vat" numeric NOT NULL, "shipping_address" character varying NOT NULL, "order_type" character varying NOT NULL, "delivery_charge" numeric NOT NULL, "delivery_cost" numeric NOT NULL, "remarks" character varying, "customerId" integer, CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute_item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "attributeId" integer, CONSTRAINT "PK_f60d140216e81368589091d1b3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "parentTagId" integer, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lot" ("id" SERIAL NOT NULL, "lot_no" character varying, "name" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "total_quantity" integer, CONSTRAINT "PK_2ba293e2165c7b93cd766c8ac9b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brand" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "address" character varying, "link" character varying, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "created" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying, "parentCategoryId" integer, "is_pations" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supplier" ("id" SERIAL NOT NULL, "name" character varying(255), "email" character varying(255), "phone" character varying(255), "emergency_contact" character varying(255), "address" character varying(500), "Type" character varying(255), "remarks" character varying(550), "account_balance" numeric(20,2) DEFAULT '0', "totalAmount" numeric(10,2) DEFAULT '0', "dueAmount" numeric(10,2) DEFAULT '0', "paidAmount" numeric(10,2) DEFAULT '0', "points" character varying(550), "Special_Date_Type" character varying(255), "special_dates" TIMESTAMP, "is_active" boolean DEFAULT true, "is_wholesale" boolean DEFAULT true, "data" json, CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "sku" character varying, "slug" character varying, "barcode" character varying, "created" TIMESTAMP DEFAULT now(), "updated" TIMESTAMP DEFAULT now(), "quantity" integer, "purchasePrice" numeric(10,2) DEFAULT '0', "sellingPrice" numeric(10,2) DEFAULT '0', "discountPrice" numeric(10,2) DEFAULT '0', "discount" integer, "images" text, "is_variant" boolean DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "locationId" integer, "lotId" integer, "brandId" integer, "supplierId" integer, "categoryId" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_variation" ("id" SERIAL NOT NULL, "name" character varying, "created" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer, "purchasePrice" numeric(10,2) DEFAULT '0', "sellingPrice" numeric(10,2) DEFAULT '0', "discountPrice" numeric(10,2) DEFAULT '0', "discount" integer DEFAULT '0', "barcode" character varying, "images" text, "is_active" boolean NOT NULL DEFAULT true, "itemId" integer, "locationId" integer, CONSTRAINT "PK_94e9797b97edc595b9e19225433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoice_item" ("id" SERIAL NOT NULL, "item_name" character varying NOT NULL, "price" numeric NOT NULL, "sales_discount" numeric NOT NULL, "qty" integer NOT NULL, "is_returned" boolean NOT NULL DEFAULT false, "is_refund" boolean NOT NULL DEFAULT false, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "invoiceId" integer, "itemVariationId" integer, CONSTRAINT "PK_621317346abdf61295516f3cb76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "designation" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "departmentId" integer, CONSTRAINT "PK_8c84a3c335a852ff2d426cb0112" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying, "phone" character varying NOT NULL, "designationId" integer, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_attributes_attribute" ("itemId" integer NOT NULL, "attributeId" integer NOT NULL, CONSTRAINT "PK_636963eb28238cc8556142332a7" PRIMARY KEY ("itemId", "attributeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97511b34e61618752bbe8ca1fd" ON "item_attributes_attribute" ("itemId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ee0d55ebb1eb16b5eccf045979" ON "item_attributes_attribute" ("attributeId") `);
        await queryRunner.query(`CREATE TABLE "item_tags_tag" ("itemId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_8e877df38e46ea03afaa8ce3577" PRIMARY KEY ("itemId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5054f98dd0c65e7fe5be4e2660" ON "item_tags_tag" ("itemId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b3d7c2df025e808ef2cbd12286" ON "item_tags_tag" ("tagId") `);
        await queryRunner.query(`CREATE TABLE "item_related_items_item" ("itemId_1" integer NOT NULL, "itemId_2" integer NOT NULL, CONSTRAINT "PK_f2f8925ec72c0964c94ce5dd2db" PRIMARY KEY ("itemId_1", "itemId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f3129b057d31aa0d83d940ca17" ON "item_related_items_item" ("itemId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_aa4beda9f34dd5771993913a5a" ON "item_related_items_item" ("itemId_2") `);
        await queryRunner.query(`CREATE TABLE "item_variation_attributes_attribute_item" ("itemVariationId" integer NOT NULL, "attributeItemId" integer NOT NULL, CONSTRAINT "PK_1451d2d2f28d9861e539a17879d" PRIMARY KEY ("itemVariationId", "attributeItemId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_341bc12d38782a6765231211eb" ON "item_variation_attributes_attribute_item" ("itemVariationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c0a991da36ccc203e7034f3df0" ON "item_variation_attributes_attribute_item" ("attributeItemId") `);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_925aa26ea12c28a6adb614445ee" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attribute_item" ADD CONSTRAINT "FK_55e5e3ea2d179a30165056ee95d" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_e7ba4974cfa176a3291b1d06972" FOREIGN KEY ("parentTagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43" FOREIGN KEY ("parentCategoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_e97b6ed5f00c41c3ef3b7f22685" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_f0b8a9f98ce34e11cd796869f3e" FOREIGN KEY ("lotId") REFERENCES "lot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_9e2a16fa67338b5d7ba015b4e98" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_e7c44eae41483213a380f4c57c5" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_c0c8f47a702c974a77812169bc2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_variation" ADD CONSTRAINT "FK_cbba5be54adf164b2f32226c3f6" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_variation" ADD CONSTRAINT "FK_0fdb56fb0e184e43d3fbf091de0" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice_item" ADD CONSTRAINT "FK_553d5aac210d22fdca5c8d48ead" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice_item" ADD CONSTRAINT "FK_e0e76b70f0e019f0815217c2063" FOREIGN KEY ("itemVariationId") REFERENCES "item_variation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "designation" ADD CONSTRAINT "FK_db94a67866860fc6d2e4a60388d" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_e41e10c17872cdf2f511e5d0097" FOREIGN KEY ("designationId") REFERENCES "designation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_attributes_attribute" ADD CONSTRAINT "FK_97511b34e61618752bbe8ca1fd9" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item_attributes_attribute" ADD CONSTRAINT "FK_ee0d55ebb1eb16b5eccf045979b" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item_tags_tag" ADD CONSTRAINT "FK_5054f98dd0c65e7fe5be4e2660c" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item_tags_tag" ADD CONSTRAINT "FK_b3d7c2df025e808ef2cbd12286b" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item_related_items_item" ADD CONSTRAINT "FK_f3129b057d31aa0d83d940ca171" FOREIGN KEY ("itemId_1") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item_related_items_item" ADD CONSTRAINT "FK_aa4beda9f34dd5771993913a5aa" FOREIGN KEY ("itemId_2") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item_variation_attributes_attribute_item" ADD CONSTRAINT "FK_341bc12d38782a6765231211eb5" FOREIGN KEY ("itemVariationId") REFERENCES "item_variation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item_variation_attributes_attribute_item" ADD CONSTRAINT "FK_c0a991da36ccc203e7034f3df00" FOREIGN KEY ("attributeItemId") REFERENCES "attribute_item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_variation_attributes_attribute_item" DROP CONSTRAINT "FK_c0a991da36ccc203e7034f3df00"`);
        await queryRunner.query(`ALTER TABLE "item_variation_attributes_attribute_item" DROP CONSTRAINT "FK_341bc12d38782a6765231211eb5"`);
        await queryRunner.query(`ALTER TABLE "item_related_items_item" DROP CONSTRAINT "FK_aa4beda9f34dd5771993913a5aa"`);
        await queryRunner.query(`ALTER TABLE "item_related_items_item" DROP CONSTRAINT "FK_f3129b057d31aa0d83d940ca171"`);
        await queryRunner.query(`ALTER TABLE "item_tags_tag" DROP CONSTRAINT "FK_b3d7c2df025e808ef2cbd12286b"`);
        await queryRunner.query(`ALTER TABLE "item_tags_tag" DROP CONSTRAINT "FK_5054f98dd0c65e7fe5be4e2660c"`);
        await queryRunner.query(`ALTER TABLE "item_attributes_attribute" DROP CONSTRAINT "FK_ee0d55ebb1eb16b5eccf045979b"`);
        await queryRunner.query(`ALTER TABLE "item_attributes_attribute" DROP CONSTRAINT "FK_97511b34e61618752bbe8ca1fd9"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_e41e10c17872cdf2f511e5d0097"`);
        await queryRunner.query(`ALTER TABLE "designation" DROP CONSTRAINT "FK_db94a67866860fc6d2e4a60388d"`);
        await queryRunner.query(`ALTER TABLE "invoice_item" DROP CONSTRAINT "FK_e0e76b70f0e019f0815217c2063"`);
        await queryRunner.query(`ALTER TABLE "invoice_item" DROP CONSTRAINT "FK_553d5aac210d22fdca5c8d48ead"`);
        await queryRunner.query(`ALTER TABLE "item_variation" DROP CONSTRAINT "FK_0fdb56fb0e184e43d3fbf091de0"`);
        await queryRunner.query(`ALTER TABLE "item_variation" DROP CONSTRAINT "FK_cbba5be54adf164b2f32226c3f6"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_c0c8f47a702c974a77812169bc2"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_e7c44eae41483213a380f4c57c5"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_9e2a16fa67338b5d7ba015b4e98"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_f0b8a9f98ce34e11cd796869f3e"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_e97b6ed5f00c41c3ef3b7f22685"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_e7ba4974cfa176a3291b1d06972"`);
        await queryRunner.query(`ALTER TABLE "attribute_item" DROP CONSTRAINT "FK_55e5e3ea2d179a30165056ee95d"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_925aa26ea12c28a6adb614445ee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c0a991da36ccc203e7034f3df0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_341bc12d38782a6765231211eb"`);
        await queryRunner.query(`DROP TABLE "item_variation_attributes_attribute_item"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aa4beda9f34dd5771993913a5a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3129b057d31aa0d83d940ca17"`);
        await queryRunner.query(`DROP TABLE "item_related_items_item"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3d7c2df025e808ef2cbd12286"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5054f98dd0c65e7fe5be4e2660"`);
        await queryRunner.query(`DROP TABLE "item_tags_tag"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ee0d55ebb1eb16b5eccf045979"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97511b34e61618752bbe8ca1fd"`);
        await queryRunner.query(`DROP TABLE "item_attributes_attribute"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "designation"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "invoice_item"`);
        await queryRunner.query(`DROP TABLE "item_variation"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "brand"`);
        await queryRunner.query(`DROP TABLE "lot"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "attribute"`);
        await queryRunner.query(`DROP TABLE "attribute_item"`);
        await queryRunner.query(`DROP TABLE "invoice"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_enum"`);
    }

}
