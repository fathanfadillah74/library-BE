const express = require('express');
const oprConfigApp = require('../config/config');
const { createUser, updateUser, getUser, deleteUser } = require('../controller/users');
const { saveBook, getAllBooks, createWishlist, getWishlist, deleteWishlist } = require('../controller/books');
const { loginUser } = require('../controller/auth');
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
    route.get(oprConfigApp.API.getUser, getUser)
    route.post(oprConfigApp.API.createUser, createUser)
    route.post(oprConfigApp.API.updateUser, updateUser)
    route.post(oprConfigApp.API.loginUser, loginUser)
    route.post(oprConfigApp.API.deleteUser, deleteUser)
    //user end

    //books start
    route.get(oprConfigApp.API.getAllBooks, getAllBooks)
    route.post(oprConfigApp.API.saveBook, saveBook)
    //books end
    
    //wishlist start
    route.post(oprConfigApp.API.createWishlist, createWishlist)
    route.get(oprConfigApp.API.getWishlist, getWishlist)
    route.delete(oprConfigApp.API.deleteWishlist, deleteWishlist)
    //wishlist end


    route.use(logger);

    app.use('/', route);
};

module.exports = routeHandler;
