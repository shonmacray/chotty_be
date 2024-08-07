-- CreateEnum
CREATE TYPE "Color" AS ENUM ('blue', 'green', 'orange', 'yellow', 'lime', 'teal', 'cyan', 'violet', 'pink', 'rose');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "color" "Color" NOT NULL DEFAULT 'cyan';
