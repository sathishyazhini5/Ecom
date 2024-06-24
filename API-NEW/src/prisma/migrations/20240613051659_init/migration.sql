-- CreateTable
CREATE TABLE "customer" (
    "user_id" BIGSERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "dob" TEXT,
    "gender" TEXT,
    "mobile_number" TEXT,
    "alternative_number" TEXT,
    "marital_status" TEXT,
    "anniversary_date" TEXT,
    "email_id" TEXT,
    "user_type" TEXT,
    "org_id" BIGINT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "product_type" (
    "product_type_id" BIGSERIAL NOT NULL,
    "product_type_name" TEXT NOT NULL,
    "product_type_desc" TEXT,
    "org_id" BIGINT NOT NULL,
    "img_small" TEXT,
    "img_big" TEXT,

    CONSTRAINT "product_type_pkey" PRIMARY KEY ("product_type_id")
);

-- CreateTable
CREATE TABLE "category" (
    "category_id" BIGSERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "category_desc" TEXT,
    "product_type_id" BIGINT NOT NULL,
    "org_id" BIGINT NOT NULL,
    "img_small" TEXT,
    "img_big" TEXT,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "sub_category" (
    "sub_category_id" BIGSERIAL NOT NULL,
    "sub_category_name" TEXT NOT NULL,
    "sub_category_desc" TEXT,
    "category_id" BIGINT NOT NULL,
    "product_type_id" BIGINT NOT NULL,
    "org_id" BIGINT NOT NULL,
    "img_small" TEXT,
    "img_big" TEXT,

    CONSTRAINT "sub_category_pkey" PRIMARY KEY ("sub_category_id")
);

-- CreateTable
CREATE TABLE "product" (
    "product_id" BIGSERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_desc" TEXT,
    "product_type_id" BIGINT,
    "category_id" BIGINT,
    "sub_category_id" BIGINT,
    "img_small" TEXT,
    "manuf_price" DECIMAL(65,30),
    "retail_price" DECIMAL(65,30),
    "product_unique_no" BIGINT,
    "org_id" BIGINT NOT NULL,
    "reward_points" INTEGER,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("org_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_type" ADD CONSTRAINT "product_type_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("org_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("product_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("org_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_category" ADD CONSTRAINT "sub_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_category" ADD CONSTRAINT "sub_category_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("product_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_category" ADD CONSTRAINT "sub_category_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("org_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("product_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "sub_category"("sub_category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("org_id") ON DELETE RESTRICT ON UPDATE CASCADE;
