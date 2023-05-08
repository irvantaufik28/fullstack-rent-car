import { MigrationInterface, QueryRunner } from "typeorm";

export class databasebaru1683452156171 implements MigrationInterface {
    name = 'databasebaru1683452156171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car_media" ("id" SERIAL NOT NULL, "car_id" integer NOT NULL, "is_main_image" boolean NOT NULL, "image_url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a1ed9e825e997cc6dbbd9c55b60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address_types" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_88dddf6536be711d7377006a02d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "districts" ("id" SERIAL NOT NULL, "city_id" integer NOT NULL, "name" character varying NOT NULL, "postal_code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_972a72ff4e3bea5c7f43a2b98af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provinces" ("id" SERIAL NOT NULL, "country_id" integer NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2e4260eedbcad036ec53222e0c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cities" ("id" SERIAL NOT NULL, "province_id" integer NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_address" ("id" SERIAL NOT NULL, "user_detail_id" integer NOT NULL, "city_id" integer NOT NULL, "address_type_id" integer NOT NULL, "is_main_address" boolean NOT NULL, "detail_address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_23810fb397050d8ac37dae44ff6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_detail" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying, "phone_number" character varying NOT NULL, "address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6b203e1eaf5f0432a2681870696" UNIQUE ("phone_number"), CONSTRAINT "REL_aebc3bfe11ea329ed91cd8c575" UNIQUE ("user_id"), CONSTRAINT "PK_673613c95633d9058a44041794d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" SERIAL NOT NULL, "isRevoked" boolean NOT NULL, "expiredAt" TIMESTAMP NOT NULL, "token_id" integer NOT NULL, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role_name" character varying NOT NULL DEFAULT 'CUSTOMER', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "total_price" integer NOT NULL, "start_rent_at" TIMESTAMP NOT NULL, "finish_rent_at" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "slip_id" integer NOT NULL, "user_id" integer NOT NULL, "car_id" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "category" character varying NOT NULL, "price" integer NOT NULL, "status" boolean NOT NULL DEFAULT false, "image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_detail" ("id" SERIAL NOT NULL, "car_id" integer NOT NULL, "owner_id" integer NOT NULL, "vehicle_color" character varying NOT NULL, "car_brand" character varying NOT NULL, "plat_number" character varying NOT NULL, "transmission" character varying NOT NULL, "fuel_type" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_f0b96ef8dfa3bb62f468ec1f69" UNIQUE ("car_id"), CONSTRAINT "PK_d005e5a8cbcac7245da444464c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifcation" ("id" SERIAL NOT NULL, "recipient_id" integer NOT NULL, "sender_id" integer NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1ed8a03856b67f4c3bc380831ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "otp_type" character varying NOT NULL, "otp_code" character varying NOT NULL, "expired_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "slip" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "order_id" character varying NOT NULL, "url_slip" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c39db5434c5f16bf62bb7242e95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car_media" ADD CONSTRAINT "FK_decd7d028444552920ca6e110b6" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "districts" ADD CONSTRAINT "FK_d7d1704cfb8bc19fb0d9c2f7ced" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provinces" ADD CONSTRAINT "FK_4148c03cb7bf422b9ee3ade134e" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_52af18d505515614479e5c9f5e9" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_address" ADD CONSTRAINT "FK_f1324d36918c4b719583eb10a90" FOREIGN KEY ("address_type_id") REFERENCES "address_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_address" ADD CONSTRAINT "FK_cf102571cfd5ae9009ab3647ec7" FOREIGN KEY ("user_detail_id") REFERENCES "user_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_address" ADD CONSTRAINT "FK_1a60741f1059e57d9b0528de535" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_detail" ADD CONSTRAINT "FK_aebc3bfe11ea329ed91cd8c5759" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_ad51f2ca464e5a34cc585eafc11" FOREIGN KEY ("token_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_34ffa78e1aa87435ae0dc66168e" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car_detail" ADD CONSTRAINT "FK_f0b96ef8dfa3bb62f468ec1f69c" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_detail" DROP CONSTRAINT "FK_f0b96ef8dfa3bb62f468ec1f69c"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_34ffa78e1aa87435ae0dc66168e"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_ad51f2ca464e5a34cc585eafc11"`);
        await queryRunner.query(`ALTER TABLE "user_detail" DROP CONSTRAINT "FK_aebc3bfe11ea329ed91cd8c5759"`);
        await queryRunner.query(`ALTER TABLE "customer_address" DROP CONSTRAINT "FK_1a60741f1059e57d9b0528de535"`);
        await queryRunner.query(`ALTER TABLE "customer_address" DROP CONSTRAINT "FK_cf102571cfd5ae9009ab3647ec7"`);
        await queryRunner.query(`ALTER TABLE "customer_address" DROP CONSTRAINT "FK_f1324d36918c4b719583eb10a90"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_52af18d505515614479e5c9f5e9"`);
        await queryRunner.query(`ALTER TABLE "provinces" DROP CONSTRAINT "FK_4148c03cb7bf422b9ee3ade134e"`);
        await queryRunner.query(`ALTER TABLE "districts" DROP CONSTRAINT "FK_d7d1704cfb8bc19fb0d9c2f7ced"`);
        await queryRunner.query(`ALTER TABLE "car_media" DROP CONSTRAINT "FK_decd7d028444552920ca6e110b6"`);
        await queryRunner.query(`DROP TABLE "slip"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`DROP TABLE "notifcation"`);
        await queryRunner.query(`DROP TABLE "car_detail"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "user_detail"`);
        await queryRunner.query(`DROP TABLE "customer_address"`);
        await queryRunner.query(`DROP TABLE "cities"`);
        await queryRunner.query(`DROP TABLE "provinces"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`DROP TABLE "districts"`);
        await queryRunner.query(`DROP TABLE "address_types"`);
        await queryRunner.query(`DROP TABLE "car_media"`);
    }

}
