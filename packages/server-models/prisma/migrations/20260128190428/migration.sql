-- CreateTable
CREATE TABLE "OneTimePassword" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OneTimePassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OneTimePassword_email_idx" ON "OneTimePassword"("email");

-- CreateIndex
CREATE INDEX "OneTimePassword_expiresAt_idx" ON "OneTimePassword"("expiresAt");
