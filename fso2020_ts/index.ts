import express = require('express');

import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (req, res) => {
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
    console.log(answer);
  } else {
    res.send({ error: 'malformatted parameters' });
    console.log({ error: 'malformatted parameters' });
  }
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
