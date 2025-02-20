/*
  Warnings:

  - The primary key for the `school` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `teacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_schoolId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_userId_fkey`;

-- DropForeignKey
ALTER TABLE `teacher` DROP FOREIGN KEY `Teacher_schoolId_fkey`;

-- DropForeignKey
ALTER TABLE `teacher` DROP FOREIGN KEY `Teacher_userId_fkey`;

-- DropIndex
DROP INDEX `Student_schoolId_fkey` ON `student`;

-- DropIndex
DROP INDEX `Teacher_schoolId_fkey` ON `teacher`;

-- AlterTable
ALTER TABLE `school` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `student` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `schoolId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `teacher` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `schoolId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
