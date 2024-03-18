-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "DomesticPackageStatusEnum" AS ENUM ('CREATED', 'REVIEWED', 'TO_BE_RECEIVED', 'RECEIVED', 'PACKED');

-- CreateEnum
CREATE TYPE "InternationalPackageStatusEnum" AS ENUM ('TO_BE_SENT', 'SENT', 'RECEIVED');

-- CreateEnum
CREATE TYPE "InternationalPackageOrderStatusEnum" AS ENUM ('TO_BE_PACKED', 'PACKED', 'CHECKED', 'PAID', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SettingKey" AS ENUM ('SITE_NAME', 'TRANSFER_USER_GUIDE_LINK', 'TRANSFER_WAREHOUSE_ADDRESS', 'TRANSFER_WAREHOUSE_PHONE');

-- CreateTable
CREATE TABLE "User" (
    "idx" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "WeChatProfile" (
    "userUuid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DomesticPackage" (
    "idx" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "status" "DomesticPackageStatusEnum" NOT NULL,
    "note" TEXT,
    "userUuid" TEXT NOT NULL,
    "createdByUuid" TEXT NOT NULL,
    "internationalPackageOrderUuid" TEXT NOT NULL,

    CONSTRAINT "DomesticPackage_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "DomesticPackageStatus" (
    "idx" SERIAL NOT NULL,
    "status" "DomesticPackageStatusEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "packageUuid" TEXT NOT NULL,

    CONSTRAINT "DomesticPackageStatus_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "RepackedDomesticPackage" (
    "idx" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "volume" DOUBLE PRECISION,
    "volumeUnitPrice" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "weightUnitPrice" DOUBLE PRECISION,
    "totalPrice" DOUBLE PRECISION,
    "internationalPackageOrderUuid" TEXT NOT NULL,

    CONSTRAINT "RepackedDomesticPackage_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "InternationalPackage" (
    "idx" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT,
    "address" TEXT,
    "recipient" TEXT,
    "recipientPhone" TEXT,
    "status" "InternationalPackageStatusEnum" NOT NULL,
    "note" TEXT,

    CONSTRAINT "InternationalPackage_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "InternationalPackageStatus" (
    "idx" SERIAL NOT NULL,
    "status" "InternationalPackageStatusEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "packageUuid" TEXT NOT NULL,

    CONSTRAINT "InternationalPackageStatus_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "InternationalPackageOrder" (
    "idx" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalFee" DOUBLE PRECISION NOT NULL,
    "status" "InternationalPackageOrderStatusEnum" NOT NULL,
    "userUuid" TEXT NOT NULL,
    "internationalPackageUuid" TEXT NOT NULL,

    CONSTRAINT "InternationalPackageOrder_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "InternationalPackageOrderStatus" (
    "idx" SERIAL NOT NULL,
    "status" "InternationalPackageOrderStatusEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderUuid" TEXT NOT NULL,

    CONSTRAINT "InternationalPackageOrderStatus_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "Setting" (
    "key" "SettingKey" NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_idx_key" ON "User"("idx");

-- CreateIndex
CREATE UNIQUE INDEX "WeChatProfile_userUuid_key" ON "WeChatProfile"("userUuid");

-- CreateIndex
CREATE UNIQUE INDEX "DomesticPackage_idx_key" ON "DomesticPackage"("idx");

-- CreateIndex
CREATE UNIQUE INDEX "DomesticPackage_code_key" ON "DomesticPackage"("code");

-- CreateIndex
CREATE UNIQUE INDEX "RepackedDomesticPackage_idx_key" ON "RepackedDomesticPackage"("idx");

-- CreateIndex
CREATE UNIQUE INDEX "InternationalPackage_idx_key" ON "InternationalPackage"("idx");

-- CreateIndex
CREATE UNIQUE INDEX "InternationalPackage_code_key" ON "InternationalPackage"("code");

-- CreateIndex
CREATE UNIQUE INDEX "InternationalPackageOrder_idx_key" ON "InternationalPackageOrder"("idx");

-- CreateIndex
CREATE UNIQUE INDEX "InternationalPackageOrder_userUuid_internationalPackageUuid_key" ON "InternationalPackageOrder"("userUuid", "internationalPackageUuid");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_key_key" ON "Setting"("key");

-- AddForeignKey
ALTER TABLE "WeChatProfile" ADD CONSTRAINT "WeChatProfile_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomesticPackage" ADD CONSTRAINT "DomesticPackage_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomesticPackage" ADD CONSTRAINT "DomesticPackage_createdByUuid_fkey" FOREIGN KEY ("createdByUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomesticPackage" ADD CONSTRAINT "DomesticPackage_internationalPackageOrderUuid_fkey" FOREIGN KEY ("internationalPackageOrderUuid") REFERENCES "InternationalPackageOrder"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomesticPackageStatus" ADD CONSTRAINT "DomesticPackageStatus_packageUuid_fkey" FOREIGN KEY ("packageUuid") REFERENCES "DomesticPackage"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepackedDomesticPackage" ADD CONSTRAINT "RepackedDomesticPackage_internationalPackageOrderUuid_fkey" FOREIGN KEY ("internationalPackageOrderUuid") REFERENCES "InternationalPackageOrder"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternationalPackageStatus" ADD CONSTRAINT "InternationalPackageStatus_packageUuid_fkey" FOREIGN KEY ("packageUuid") REFERENCES "InternationalPackage"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternationalPackageOrder" ADD CONSTRAINT "InternationalPackageOrder_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternationalPackageOrder" ADD CONSTRAINT "InternationalPackageOrder_internationalPackageUuid_fkey" FOREIGN KEY ("internationalPackageUuid") REFERENCES "InternationalPackage"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternationalPackageOrderStatus" ADD CONSTRAINT "InternationalPackageOrderStatus_orderUuid_fkey" FOREIGN KEY ("orderUuid") REFERENCES "InternationalPackageOrder"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
