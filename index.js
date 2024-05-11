const express = require('express');
const bodyParser = require('body-parser');
const routeHandler = require('./src/route/route');
const oprConfigApp = require('./src/config/config')

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routeHandler(app);


app.listen(oprConfigApp.port, () => {
  console.log(`App listening on port ${oprConfigApp.port}`);
});
