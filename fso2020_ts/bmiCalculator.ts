export interface BodyStats {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BodyStats => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number) => {
  const result = weight / (height / 100) / (height / 100);

  if (result < 15) {
    return 'Very severely underweight';
  } else if (result >= 15 && result < 16) {
    return 'Severely underweight';
  } else if (result >= 16 && result < 18.5) {
    return 'Underweight';
  } else if (result >= 18.5 && result < 25) {
    return 'Normal (healthy weight)';
  } else if (result >= 25 && result < 30) {
    return 'Overweight';
  } else if (result >= 30 && result < 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (result >= 35 && result < 40) {
    return 'Obese Class II (Severely obese)';
  } else if (result >= 40) {
    return 'Obese Class III (Very severely obese)';
  }
};
try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.log('Error, you screwed up: ', error.message);
}
