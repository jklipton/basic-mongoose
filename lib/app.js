const express = require('express');
const app = express();
const mongeese = require('./routes/mongeese');

app.use(express.json());

app.use('/mongeese', mongeese);

module.exports = app;