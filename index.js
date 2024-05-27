const express = require('express');
const bodyParser = require('body-parser');
const routeHandler = require('./src/route/route');
const oprConfigApp = require('./src/config/config')
const cors = require('cors');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routeHandler(app);


app.listen(oprConfigApp.port, () => {
  console.log(`App listening on port ${oprConfigApp.port}`);
});
