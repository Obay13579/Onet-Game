const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Include and use your user and score modules here
const userModule = require('./modules/user');
const scoreModule = require('./modules/score');

app.use('/api/user', userModule);
app.use('/api/score', scoreModule);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
