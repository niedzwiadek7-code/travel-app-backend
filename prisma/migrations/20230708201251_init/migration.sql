-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'AGENCY_OWNER', 'ADMIN');

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateRange" (
    "id" SERIAL NOT NULL,
    "from" TIMESTAMP NOT NULL,
    "to" TIMESTAMP NOT NULL,

    CONSTRAINT "DateRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeRange" (
    "id" SERIAL NOT NULL,
    "from" TIME NOT NULL,
    "to" TIME NOT NULL,

    CONSTRAINT "TimeRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TravelRecipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "TravelRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementTravel" (
    "id" SERIAL NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "timeRangeId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "travelRecipeId" INTEGER NOT NULL,

    CONSTRAINT "ElementTravel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "accepted" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,
    "activityTypeId" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityParameter" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "activityTypeParameterId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "ActivityParameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ActivityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityTypeParameter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "activityTypeId" INTEGER NOT NULL,

    CONSTRAINT "ActivityTypeParameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryRating" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "ratingId" INTEGER NOT NULL,

    CONSTRAINT "CategoryRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementTravelInstance" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER NOT NULL,
    "dataRangeId" INTEGER NOT NULL,
    "travelInstanceId" INTEGER NOT NULL,

    CONSTRAINT "ElementTravelInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementTravelPhoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "elementTravelId" INTEGER NOT NULL,
    "elementTravelInstanceId" INTEGER NOT NULL,

    CONSTRAINT "ElementTravelPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "activityId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TravelInstance" (
    "id" SERIAL NOT NULL,
    "startDate" DATE NOT NULL,
    "userId" INTEGER NOT NULL,
    "travelRecipeId" INTEGER NOT NULL,

    CONSTRAINT "TravelInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_likeAnswers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_dislikeAnswers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_likeQuestions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_dislikeQuestions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_likeAnswers_AB_unique" ON "_likeAnswers"("A", "B");

-- CreateIndex
CREATE INDEX "_likeAnswers_B_index" ON "_likeAnswers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_dislikeAnswers_AB_unique" ON "_dislikeAnswers"("A", "B");

-- CreateIndex
CREATE INDEX "_dislikeAnswers_B_index" ON "_dislikeAnswers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_likeQuestions_AB_unique" ON "_likeQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_likeQuestions_B_index" ON "_likeQuestions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_dislikeQuestions_AB_unique" ON "_dislikeQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_dislikeQuestions_B_index" ON "_dislikeQuestions"("B");

-- AddForeignKey
ALTER TABLE "TravelRecipe" ADD CONSTRAINT "TravelRecipe_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementTravel" ADD CONSTRAINT "ElementTravel_timeRangeId_fkey" FOREIGN KEY ("timeRangeId") REFERENCES "TimeRange"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementTravel" ADD CONSTRAINT "ElementTravel_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementTravel" ADD CONSTRAINT "ElementTravel_travelRecipeId_fkey" FOREIGN KEY ("travelRecipeId") REFERENCES "TravelRecipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "ActivityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityParameter" ADD CONSTRAINT "ActivityParameter_activityTypeParameterId_fkey" FOREIGN KEY ("activityTypeParameterId") REFERENCES "ActivityTypeParameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityParameter" ADD CONSTRAINT "ActivityParameter_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityTypeParameter" ADD CONSTRAINT "ActivityTypeParameter_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "ActivityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryRating" ADD CONSTRAINT "CategoryRating_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementTravelInstance" ADD CONSTRAINT "ElementTravelInstance_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementTravelInstance" ADD CONSTRAINT "ElementTravelInstance_dataRangeId_fkey" FOREIGN KEY ("dataRangeId") REFERENCES "DateRange"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementTravelInstance" ADD CONSTRAINT "ElementTravelInstance_travelInstanceId_fkey" FOREIGN KEY ("travelInstanceId") REFERENCES "TravelInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementTravelPhoto" ADD CONSTRAINT "ElementTravelPhoto_elementTravelInstanceId_fkey" FOREIGN KEY ("elementTravelInstanceId") REFERENCES "ElementTravelInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelInstance" ADD CONSTRAINT "TravelInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelInstance" ADD CONSTRAINT "TravelInstance_travelRecipeId_fkey" FOREIGN KEY ("travelRecipeId") REFERENCES "TravelRecipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likeAnswers" ADD CONSTRAINT "_likeAnswers_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likeAnswers" ADD CONSTRAINT "_likeAnswers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dislikeAnswers" ADD CONSTRAINT "_dislikeAnswers_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dislikeAnswers" ADD CONSTRAINT "_dislikeAnswers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likeQuestions" ADD CONSTRAINT "_likeQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likeQuestions" ADD CONSTRAINT "_likeQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dislikeQuestions" ADD CONSTRAINT "_dislikeQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dislikeQuestions" ADD CONSTRAINT "_dislikeQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
