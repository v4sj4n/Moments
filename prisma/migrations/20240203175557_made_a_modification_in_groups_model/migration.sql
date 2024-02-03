/*
  Warnings:

  - You are about to drop the column `name` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[joincode]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - The required column `joincode` was added to the `Group` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `title` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "name",
ADD COLUMN     "joincode" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_joincode_key" ON "Group"("joincode");
