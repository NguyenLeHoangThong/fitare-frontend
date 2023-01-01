import { bmiTypes, muscleGroupTypes, durationTypes, levelTypes, practiceExercisesStatuses } from "models/ExercisePlan";

export const getBMITypes = (value) => {
    const result = bmiTypes.find((item) => item.value === value);
    return result;
}

export const getMuscleGroupTypes = (value) => {
    const result = muscleGroupTypes.find((item) => item.value === value);
    return result;
}

export const getDurationTypes = (value) => {
    const result = durationTypes.find((item) => item.value === value);
    return result;
}

export const getLevelTypes = (value) => {
    const result = levelTypes.find((item) => item.value === value);
    return result;
}

export const difficultyFormatArray = (value) => {
    const level = getLevelTypes(value)?.id;

    const levelArr = [];

    for (let i = 0; i < 5; i++) {
        if (i + 1 <= level) {
            levelArr.push(true);
        }
        else {
            levelArr.push(false);
        }
    }

    return levelArr;
}

export const getExPlansStatus = (value) => {
    const result = practiceExercisesStatuses.find((item) => item.value === value);
    return result;
}