-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "videoLink" TEXT,
    "videoThumbnail" TEXT,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);
