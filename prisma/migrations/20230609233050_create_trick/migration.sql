-- CreateTable
CREATE TABLE "Trick" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "videoLink" TEXT,
    "videoThumbnail" TEXT,
    "typeId" INTEGER,

    CONSTRAINT "Trick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrickType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TrickType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrickType_name_key" ON "TrickType"("name");

-- AddForeignKey
ALTER TABLE "Trick" ADD CONSTRAINT "Trick_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TrickType"("id") ON DELETE SET NULL ON UPDATE SET NULL;
