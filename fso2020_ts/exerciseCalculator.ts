interface TrainingStats {
  targetNumber: number;
  weeklyTraining: number[];
}

interface TrainingData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgs = (args: string[]): TrainingStats => {
  if (args.length < 4) throw new Error('Not enough arguments');

  let weeklyTotalHours: number[] = [];

  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      weeklyTotalHours.push(parseFloat(args[i]));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  if (!isNaN(Number(args[2]))) {
    return {
      targetNumber: Number(args[2]),
      weeklyTraining: weeklyTotalHours,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const dayCount = (weeklyTraining: number[]) => {
  let days = weeklyTraining.filter((el) => el > 0);
  return days.length;
};
const averageCount = (weeklyTraining: number[]) => {
  let trainingHours = weeklyTraining.reduce(function (a, b) {
    return a + b;
  }, 0);
  let result = trainingHours / weeklyTraining.length;
  return result;
};
const succesCount = (weeklyTraining: number[], targetNumber: number) => {
  if (averageCount(weeklyTraining) < targetNumber) {
    return false;
  } else {
    return true;
  }
};
const ratingCount = (weeklyTraining: number[]) => {
  if (averageCount(weeklyTraining) < 1) {
    return 1;
  } else if (
    averageCount(weeklyTraining) >= 1 &&
    averageCount(weeklyTraining) < 2
  ) {
    return 2;
  } else if (averageCount(weeklyTraining) >= 2) {
    return 3;
  }
};
const ratingDescriptionGenerator = (weeklyTraining: number[]) => {
  if (ratingCount(weeklyTraining) == 1) {
    return 'get your ass off the sofa';
  }
  if (ratingCount(weeklyTraining) == 2) {
    return 'not too shabby';
  }
  if (ratingCount(weeklyTraining) == 3) {
    return 'goog work! keep it up!';
  }
};

const calculateExercises = (weeklyTraining: number[], targetNumber: number) => {
  let feedback: TrainingData = {
    periodLength: weeklyTraining.length,
    trainingDays: Number(weeklyTraining.filter((el) => el > 0).length),
    success: succesCount(weeklyTraining, targetNumber),
    rating: ratingCount(weeklyTraining),
    ratingDescription: ratingDescriptionGenerator(weeklyTraining),
    target: targetNumber,
    average: averageCount(weeklyTraining),
  };
  console.log(feedback);
};

try {
  const { weeklyTraining, targetNumber } = parseArgs(process.argv);
  calculateExercises(weeklyTraining, targetNumber);
} catch (error) {
  console.log('Error, you screwed up: ', error.message);
}
