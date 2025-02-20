/*
  Warnings:

  - You are about to drop the column `schooldId` on the `module` table. All the data in the column will be lost.
  - Added the required column `schoolId` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `module` DROP FOREIGN KEY `Module_schooldId_fkey`;

-- DropIndex
DROP INDEX `Module_schooldId_fkey` ON `module`;

-- AlterTable
ALTER TABLE `module` DROP COLUMN `schooldId`,
    ADD COLUMN `schoolId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Module` ADD CONSTRAINT `Module_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
