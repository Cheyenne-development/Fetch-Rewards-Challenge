require('dotenv').config();
const express = require('express');
const store = require('./store');
const pointsRoutes = require('./points-routes');
const app = express();



app.use(pointsRoutes);

app.get('/', (req, res) => {
    res.send('This is a thing');
});


module.exports = app;