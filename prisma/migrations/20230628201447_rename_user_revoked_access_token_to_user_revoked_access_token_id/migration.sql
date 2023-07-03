/*
  Warnings:

  - You are about to drop the `UserRevokedAccessToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRevokedAccessToken" DROP CONSTRAINT "UserRevokedAccessToken_userId_fkey";

-- DropTable
DROP TABLE "UserRevokedAccessToken";

-- CreateTable
CREATE TABLE "UserRevokedAccessTokenId" (
    "id" SERIAL NOT NULL,
    "tokenId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserRevokedAccessTokenId_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRevokedAccessTokenId" ADD CONSTRAINT "UserRevokedAccessTokenId_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
