const weeklyTraining = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;

interface TrainingData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const dayCount = () => {
  let days = weeklyTraining.filter((el) => el > 0);
  return days.length;
};

const averageCount = () => {
  let trainingHours = weeklyTraining.reduce(function (acc, val) {
    return acc + val;
  }, 0);
  let result = trainingHours / weeklyTraining.length;
  return result;
};

const succesCount = () => {
  if (averageCount() < target) {
    return false;
  } else {
    return true;
  }
};

const ratingCount = () => {
  if (averageCount() < 1) {
    return 1;
  } else if (averageCount() >= 1 && averageCount() < 2) {
    return 2;
  } else if (averageCount() > 2) {
    return 3;
  }
};

const ratingDescriptionGenerator = () => {
  if (ratingCount() == 1) {
    return 'get your ass off the sofa';
  }
  if (ratingCount() == 2) {
    return 'not too shabby';
  }
  if (ratingCount() == 3) {
    return 'goog work! keep it up!';
  }
};

let feedback: TrainingData = {
  periodLength: weeklyTraining.length,
  trainingDays: dayCount(),
  success: succesCount(),
  rating: ratingCount(),
  ratingDescription: ratingDescriptionGenerator(),
  target: target,
  average: averageCount(),
};

console.log(feedback);
