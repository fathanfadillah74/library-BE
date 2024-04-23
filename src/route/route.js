const { Router } = require('express');

const routeHandler = async (app) => {
    const router = Router();

    app.get('/users', (req, res) => {
        res.send('users')
    })
    app.use('/', router);
};

module.exports = routeHandler;
