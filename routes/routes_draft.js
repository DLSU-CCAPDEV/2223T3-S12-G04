const express = require('express');

const controller = require('../controllers/controller_draft.js');

const app = express();

app.get(`/`, controller.getRoot); // guest home page as default page
app.get(`/guesthome`, controller.redirectRoot); // redirecting to guest home page


app.get(`/labtechhome`, controller.redirectLabTechHome);
app.get(`/labtechres1`, controller.redirectLabTechReserve1);
app.get(`/labtechres2`, controller.redirectLabTechReserve2);
app.get(`/labtechres3`, controller.redirectLabTechReserve3);
app.get(`/labtechprofile`, controller.redirectLabTechProfile);
app.get(`/login`, controller.redirectLogin); //calling function to LOGIN.hbs
app.get(`/register`, controller.redirectRegister); // calling function to REGISTER.hbs
app.get(`/studenthome`, controller.redirectStudentHome);
app.get(`/studentres1`, controller.redirectStudentReserve1);
app.get(`/studentres2`, controller.redirectStudentReserve2);
app.get(`/studentres3`, controller.redirectStudentReserve3);
app.get(`/studentprofile`, controller.redirectStudentProfile);

app.post(`/checkAcct`, controller.checkAcct); // calling function to LOGIN the website
app.get(`/profile/:email`, controller.getProfile); // calling function to put in URL the profile signed in
app.get(`/logout`, controller.redirectRoot); // calling function to LOGOUT the website
app.get(`/profile`, controller.getUserData); // calling function to VIEW PROFILE
app.post('/register', controller.postRegister); //calling function to REGISTER to the website

module.exports = app;
