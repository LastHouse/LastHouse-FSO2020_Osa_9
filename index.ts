import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!!!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const result = calculateBmi(Number(height), Number(weight));

    const answer = {
      height: Number(req.query.height),
      weight: Number(req.query.weight),
      bmi: String(result),
    };
    res.send(answer);
    //console.log(answer);
  } else {
    res.send({ error: 'malformatted parameters' });
    //console.log({ error: 'malformatted parameters' });
  }
});

app.get('/exercises', (_reg, res) => {
  res.send('Hello!');
});

app.post('/exercises', jsonParser, (reg, res) => {
  //console.log(reg.body.daily_exercises.length);
  const weeklyTraining = reg.body.daily_exercises;
  const target = reg.body.target;

  if (weeklyTraining.length > 1 && target) {
    const result = calculateExercises(weeklyTraining, target);
    res.send(result);
    //console.log(result);
  } else {
    res.send({ error: 'parameters missing' });
    //console.log({ error: 'parameters missing' });
  }

  // TÄSTÄ PUUTTUU !ISNAN VALIDOINTI!!!
});
