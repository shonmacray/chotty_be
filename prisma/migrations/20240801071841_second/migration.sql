-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "user_group_id" INTEGER;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_user_group_id_fkey" FOREIGN KEY ("user_group_id") REFERENCES "user_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
