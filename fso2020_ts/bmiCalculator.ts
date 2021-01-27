interface BodyStats {
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

const calculateBmi = (height: number, weight: number) => {
  const result = weight / (height / 100) / (height / 100);

  if (result < 15) {
    console.log('Very severely underweight');
  } else if (result >= 15 && result < 16) {
    console.log('Severely underweight');
  } else if (result >= 16 && result < 18.5) {
    console.log('Underweight');
  } else if (result >= 18.5 && result < 25) {
    console.log('Normal (healthy weight)');
  } else if (result >= 25 && result < 30) {
    console.log('Overweight');
  } else if (result >= 30 && result < 35) {
    console.log('Obese Class I (Moderately obese)');
  } else if (result >= 35 && result < 40) {
    console.log('Obese Class II (Severely obese)');
  } else if (result >= 40) {
    console.log('Obese Class III (Very severely obese)');
  }
};
try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error) {
  console.log('Error, you screwed up: ', error.message);
}
