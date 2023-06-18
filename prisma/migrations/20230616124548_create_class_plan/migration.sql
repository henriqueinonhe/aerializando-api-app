-- CreateTable
CREATE TABLE "ClassPlan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "classNumber" TEXT NOT NULL,
    "focusType1" TEXT NOT NULL,
    "focusType2" TEXT NOT NULL,
    "tricksIds" INTEGER[],

    CONSTRAINT "ClassPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseBloc" (
    "id" SERIAL NOT NULL,
    "exercisesIds" INTEGER[],
    "classPlanId" INTEGER,

    CONSTRAINT "ExerciseBloc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseBloc" ADD CONSTRAINT "ExerciseBloc_classPlanId_fkey" FOREIGN KEY ("classPlanId") REFERENCES "ClassPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
