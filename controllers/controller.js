const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const session = require(`express-session`);

const controller = {
	getFavicon: function (req, res) {
        res.status(204);
    },
	
    getIndex: function (req, res) {

        // checks if a user is logged-in by checking the session data
        if(req.session && req.session.idNum) {

            /*
                redirects the client to `/profile` using HTTP GET,
                defined in `../routes/routes.js`
                passing values using URL
                which calls getProfile() method
                defined in `./profileController.js`
            */
            res.redirect('/home/' + req.session.idNum);
        }

        // else if a user is not yet logged-in
        else {

            /*
                sets `details.flag` to false
                to hide the profile and logout tabs in the nav bar
            */
            var details = {
                flag: false
            };

            // render `../views/index.hbs`
            res.render('guesthome', details);
        }
	},

    redirectRoot: function(req, res) {
        res.redirect(`/`); // Back to guest home page when logging out
    }
	
	
}
module.exports = controller;
