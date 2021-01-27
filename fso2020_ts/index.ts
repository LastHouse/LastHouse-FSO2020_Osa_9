import express = require('express');

const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});