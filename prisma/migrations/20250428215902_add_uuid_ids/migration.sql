/*
  Warnings:

  - The primary key for the `Department` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SubDepartment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "SubDepartment" DROP CONSTRAINT "SubDepartment_departmentId_fkey";

-- AlterTable
ALTER TABLE "Department" DROP CONSTRAINT "Department_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Department_id_seq";

-- AlterTable
ALTER TABLE "SubDepartment" DROP CONSTRAINT "SubDepartment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "departmentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SubDepartment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SubDepartment_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "SubDepartment" ADD CONSTRAINT "SubDepartment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
