const express = require('express');

const controller = require('../controllers/controller_draft.js');

const registerController = require('../controllers/registerController.js');

const successController = require('../controllers/successController.js');

const profileController = require('../controllers/profileController.js');

const homeController = require('../controllers/homeController.js');

const app = express();


app.get('/favicon.ico', controller.getFavicon);

app.get(`/`, controller.getRoot); // guest home page as default page
app.get(`/guesthome`, controller.redirectRoot); // redirecting to guest home page

app.get(`/login`, controller.redirectLogin); //calling function to LOGIN.hbs

app.get(`/register`, registerController.getRegister); // calling function to REGISTER.hbs
app.post(`/register`, registerController.postRegister); //calling function to REGISTER
app.get(`/success`, successController.getSuccess);
app.get(`/home/:idNum`, homeController.getHome);

app.get(`/profile/:idNum`, profileController.getProfile);

app.get(`/logout`, controller.redirectRoot); // calling function to LOGOUT the website

module.exports = app;
