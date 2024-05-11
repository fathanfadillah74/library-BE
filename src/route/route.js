const express = require('express');
const oprConfigApp = require('../config/config');
const { getAllUser, createUser } = require('../controller/users');
const route = express.Router();

const routeHandler = async (app) => {
    const logger = (req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    }

    route.get('/', (req, res) => {
        res.send(`App listening on port ${oprConfigApp.port}`)
    })

    //user start
    route.get(oprConfigApp.API.getAllUser, getAllUser)
    route.post(oprConfigApp.API.createUsers, createUser)
    //user end


    route.use(logger);

    app.use('/', route);
};

module.exports = routeHandler;
