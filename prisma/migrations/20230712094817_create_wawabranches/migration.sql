-- CreateTable
CREATE TABLE "WawaBranches" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WawaBranches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WawaBranches_englishName_key" ON "WawaBranches"("englishName");
