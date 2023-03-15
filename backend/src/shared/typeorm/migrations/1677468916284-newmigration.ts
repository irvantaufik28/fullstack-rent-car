import { MigrationInterface, QueryRunner } from "typeorm";

export class newmigration1677468916284 implements MigrationInterface {
    name = 'newmigration1677468916284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_detail" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying, "phone_number" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "UQ_6b203e1eaf5f0432a2681870696" UNIQUE ("phone_number"), CONSTRAINT "REL_aebc3bfe11ea329ed91cd8c575" UNIQUE ("user_id"), CONSTRAINT "PK_673613c95633d9058a44041794d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role_name" character varying NOT NULL DEFAULT 'CUSTOMER', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "total_price" integer NOT NULL, "start_rent_at" TIMESTAMP NOT NULL, "finish_rent_at" TIMESTAMP NOT NULL, "status" boolean NOT NULL, "slip" character varying NOT NULL, "UserId" integer NOT NULL, "CarId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "category" character varying NOT NULL, "price" integer NOT NULL, "status" boolean NOT NULL DEFAULT false, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifcation" ("id" SERIAL NOT NULL, "recipient_id" integer NOT NULL, "sender_id" integer NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_1ed8a03856b67f4c3bc380831ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_detail" ADD CONSTRAINT "FK_aebc3bfe11ea329ed91cd8c5759" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_ebd3954330101d2ce82d022f9cf" FOREIGN KEY ("UserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_49f4ef66acc77a73d7d2a06119b" FOREIGN KEY ("CarId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_49f4ef66acc77a73d7d2a06119b"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_ebd3954330101d2ce82d022f9cf"`);
        await queryRunner.query(`ALTER TABLE "user_detail" DROP CONSTRAINT "FK_aebc3bfe11ea329ed91cd8c5759"`);
        await queryRunner.query(`DROP TABLE "notifcation"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_detail"`);
    }

}
