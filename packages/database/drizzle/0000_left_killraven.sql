CREATE TABLE IF NOT EXISTS "location" (
	"id" serial PRIMARY KEY NOT NULL,
	"pk_location_name" varchar(50) NOT NULL,
	"location_building" varchar(20),
	"location_city" varchar(50),
	"location_country" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_name" varchar(50) NOT NULL,
	"product_description" varchar(500),
	"mfg_vendor" varchar(50),
	"refresh_url" varchar(500),
	"current_cost" integer,
	"current_qty" integer NOT NULL,
	"refresh_qty" integer,
	"min_threshold_qty" integer,
	"cabinet" integer,
	"obsolete" integer,
	"fk_location_id" integer NOT NULL,
	"fk_product_category_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_category" varchar(30) NOT NULL,
	"fk_location_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_time" varchar(50) NOT NULL,
	"user_id" varchar(50) NOT NULL,
	"transaction_qty" integer NOT NULL,
	"used_scanner" integer,
	"recipient" varchar(50),
	"order_num" varchar(50),
	"fk_product_id" integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "location_name_idx" ON "location" ("pk_location_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_name_idx" ON "product" ("product_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_location_fk" ON "product" ("fk_location_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_category_fk" ON "product" ("fk_product_category_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_category_name_idx" ON "product_category" ("product_category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_category_location_fk" ON "product_category" ("fk_location_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transaction_product_fk" ON "transaction" ("fk_product_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_fk_location_id_location_id_fk" FOREIGN KEY ("fk_location_id") REFERENCES "location"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_fk_product_category_id_product_category_id_fk" FOREIGN KEY ("fk_product_category_id") REFERENCES "product_category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_category" ADD CONSTRAINT "product_category_fk_location_id_location_id_fk" FOREIGN KEY ("fk_location_id") REFERENCES "location"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_fk_product_id_product_id_fk" FOREIGN KEY ("fk_product_id") REFERENCES "product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
