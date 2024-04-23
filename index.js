const express = require('express');
const morgan = require('morgan');
const { routeHandler } = require('./src/route/route');
const oprConfigApp = require('./src/config/config')

const app = express();
const port = oprConfigApp.port;

app.use(morgan('combined'));

app.use('/users',routeHandler);

app.get('/', (req, res) => {
  res.send(`App is running, listening on port ${port}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
