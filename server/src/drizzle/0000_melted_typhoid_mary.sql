-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "court" (
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_id" text DEFAULT ('rec_'::text || (xata_private.xid())::text) NOT NULL,
	"locationId" text NOT NULL,
	"name" text DEFAULT 'Court',
	CONSTRAINT "_pgroll_new_court_xata_id_key" UNIQUE("xata_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location" (
	"xata_id" text DEFAULT ('rec_'::text || (xata_private.xid())::text) NOT NULL,
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "_pgroll_new_location_xata_id_key" UNIQUE("xata_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "party" (
	"xata_id" text DEFAULT ('rec_'::text || (xata_private.xid())::text) NOT NULL,
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	"courtId" text NOT NULL,
	CONSTRAINT "_pgroll_new_party_xata_id_key" UNIQUE("xata_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_id" text DEFAULT ('rec_'::text || (xata_private.xid())::text) NOT NULL,
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"partyId" text,
	CONSTRAINT "_pgroll_new_user_xata_id_key" UNIQUE("xata_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "court" ADD CONSTRAINT "locationId_link" FOREIGN KEY ("locationId") REFERENCES "public"."location"("xata_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "party" ADD CONSTRAINT "courtId_link" FOREIGN KEY ("courtId") REFERENCES "public"."court"("xata_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "partyId_link" FOREIGN KEY ("partyId") REFERENCES "public"."party"("xata_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/