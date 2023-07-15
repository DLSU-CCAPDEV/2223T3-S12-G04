const express = require('express');

const controller = require('../controllers/controller.js');

const app = express();

app.get(`/`, controller.getRoot); // guest home page as default page
app.get(`/guest`, controller.redirectRoot); // redirecting to guest home page

app.post(`/checkAcct`, controller.checkAcct); // calling function to LOGIN the website
app.get(`/profile/:email`, controller.getProfile); // calling function to put in URL the profile signed in
app.get(`/logout`, controller.redirectRoot); // calling function to LOGOUT the website
app.get(`/profile`, controller.getUserData); // calling function to VIEW PROFILE 

module.exports = app;
