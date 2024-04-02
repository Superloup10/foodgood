-- CreateEnum
CREATE TYPE "Category" AS ENUM ('MEAT', 'GROCERY', 'FRUIT', 'VEGETABLE', 'DAIRY_PRODUCT');

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(50),
    "address" VARCHAR NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "price" REAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" SERIAL NOT NULL,
    "created_at" DATE NOT NULL,
    "client_id" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buy" (
    "product_id" INTEGER NOT NULL,
    "cart_id" INTEGER NOT NULL,

    CONSTRAINT "buy_pkey" PRIMARY KEY ("product_id","cart_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cart_client_id_key" ON "cart"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "buy_product_id_key" ON "buy"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "buy_cart_id_key" ON "buy"("cart_id");

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buy" ADD CONSTRAINT "buy_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buy" ADD CONSTRAINT "buy_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
