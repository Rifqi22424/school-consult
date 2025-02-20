/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `resetToken` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The values [GURU,MURID] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `resetToken`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `role` ENUM('TEACHER', 'STUDENT') NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Teacher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `schoolId` INTEGER NULL,

    UNIQUE INDEX `Teacher_employeeId_key`(`employeeId`),
    UNIQUE INDEX `Teacher_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` VARCHAR(191) NOT NULL,
    `grade` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `schoolId` INTEGER NOT NULL,

    UNIQUE INDEX `Student_studentId_key`(`studentId`),
    UNIQUE INDEX `Student_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `School` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `School_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
