const express = require('express');
const session = require(`express-session`);

const controller = require('../controllers/controller.js');

const registerController = require('../controllers/registerController.js');

const successController = require('../controllers/successController.js');

const profileController = require('../controllers/profileController.js');

const homeController = require('../controllers/homeController.js');

const reservationController = require('../controllers/reservationController.js');

const loginController = require('../controllers/loginController.js');

const logoutController = require('../controllers/logoutController.js');

// import module `validation` from `../helpers/validation.js`
const validation = require('../helpers/validation.js');

const app = express();


app.get('/favicon.ico', controller.getFavicon);

app.get(`/`, controller.getIndex); // guest home page as default page
app.get(`/guesthome`, controller.redirectRoot); // redirecting to guest home page

app.get(`/login`, loginController.getLogin); //calling function to LOGIN.hbs
app.post(`/login`, loginController.postLogin);

app.get(`/register`, registerController.getRegister); // calling function to REGISTER.hbs
app.post(`/register`, validation.signupValidation(), registerController.postRegister); //calling function to REGISTER
app.get(`/getCheckID`, registerController.getCheckID);
app.get(`/success`, successController.getSuccess);
app.get(`/success`, successController.getHomeSuccess);
app.get(`/home/:idNum`, homeController.getHome);

app.get(`/profile/:idNum`, profileController.getProfile);
app.post(`/profile/:idNum`, profileController.postProfile);

app.get(`/res1/:idNum`, reservationController.getProfile1);
app.get(`/res2/:idNum`, reservationController.getProfile2);
app.get(`/res3/:idNum`, reservationController.getProfile3);

app.get(`/logout`, logoutController.getLogOut); // calling function to LOGOUT the website

module.exports = app;
