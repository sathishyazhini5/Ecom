-- CreateTable
CREATE TABLE "org_type" (
    "id" BIGSERIAL NOT NULL,
    "org_type" TEXT NOT NULL,
    "type_desc" TEXT NOT NULL,

    CONSTRAINT "org_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "org_id" BIGSERIAL NOT NULL,
    "org_name" TEXT NOT NULL,
    "pan_no" TEXT,
    "gst_no" TEXT,
    "org_type_id" BIGINT NOT NULL,
    "logo_path" TEXT,
    "website" TEXT,
    "email_id" TEXT NOT NULL,
    "home_url" TEXT,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("org_id")
);

-- CreateTable
CREATE TABLE "roles" (
    "role_id" BIGSERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "role_desc" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" BIGSERIAL NOT NULL,
    "org_id" BIGINT NOT NULL,
    "user_name" TEXT NOT NULL,
    "role_id" BIGINT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_org_type_id_fkey" FOREIGN KEY ("org_type_id") REFERENCES "org_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("org_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;
