/*
  Warnings:

  - You are about to drop the column `user_group_id` on the `groups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_user_group_id_fkey";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "user_group_id";

-- AddForeignKey
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
