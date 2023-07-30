-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "spell" TEXT NOT NULL,
    "korean" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "enable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_spell_level_key" ON "Word"("spell", "level");
