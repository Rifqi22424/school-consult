-- CreateTable
CREATE TABLE `Module` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `teacherId` VARCHAR(191) NOT NULL,
    `schooldId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Module` ADD CONSTRAINT `Module_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module` ADD CONSTRAINT `Module_schooldId_fkey` FOREIGN KEY (`schooldId`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
