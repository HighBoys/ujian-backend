/*
  Warnings:

  - You are about to drop the column `adminnama` on the `admin` table. All the data in the column will be lost.
  - The `bookdate` column on the `rent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `lama_sewa` on the `rent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `adminnama`,
    ADD COLUMN `adminNama` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `rent` DROP COLUMN `bookdate`,
    ADD COLUMN `bookdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `lama_sewa` INTEGER NOT NULL DEFAULT 0;
