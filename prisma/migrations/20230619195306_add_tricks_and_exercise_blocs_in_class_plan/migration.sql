/*
  Warnings:

  - You are about to drop the column `tricksIds` on the `ClassPlan` table. All the data in the column will be lost.
  - You are about to drop the column `exercisesIds` on the `ExerciseBloc` table. All the data in the column will be lost.
  - Made the column `classPlanId` on table `ExerciseBloc` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ExerciseBloc" DROP CONSTRAINT "ExerciseBloc_classPlanId_fkey";

-- AlterTable
ALTER TABLE "ClassPlan" DROP COLUMN "tricksIds";

-- AlterTable
ALTER TABLE "ExerciseBloc" DROP COLUMN "exercisesIds",
ALTER COLUMN "classPlanId" SET NOT NULL;

-- CreateTable
CREATE TABLE "_ClassPlanToTrick" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseToExerciseBloc" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassPlanToTrick_AB_unique" ON "_ClassPlanToTrick"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassPlanToTrick_B_index" ON "_ClassPlanToTrick"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToExerciseBloc_AB_unique" ON "_ExerciseToExerciseBloc"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToExerciseBloc_B_index" ON "_ExerciseToExerciseBloc"("B");

-- AddForeignKey
ALTER TABLE "ExerciseBloc" ADD CONSTRAINT "ExerciseBloc_classPlanId_fkey" FOREIGN KEY ("classPlanId") REFERENCES "ClassPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassPlanToTrick" ADD CONSTRAINT "_ClassPlanToTrick_A_fkey" FOREIGN KEY ("A") REFERENCES "ClassPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassPlanToTrick" ADD CONSTRAINT "_ClassPlanToTrick_B_fkey" FOREIGN KEY ("B") REFERENCES "Trick"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseBloc" ADD CONSTRAINT "_ExerciseToExerciseBloc_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseBloc" ADD CONSTRAINT "_ExerciseToExerciseBloc_B_fkey" FOREIGN KEY ("B") REFERENCES "ExerciseBloc"("id") ON DELETE CASCADE ON UPDATE CASCADE;
