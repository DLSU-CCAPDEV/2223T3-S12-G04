
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `profile` paths in the server
*/
const profileController = {

    /*
        executed when the client sends an HTTP GET request `/profile/:idNum`
        as defined in `../routes/routes.js`
    */
    getProfile: async function (req, res) {

        // query where `idNum` is equal to URL parameter `idNum`
        var query = {idNum: req.params.idNum};

        // fields to be returned
        var projection = 'firstname lastname idNum roles profileDesc';
		
		 var details = {};

		if(req.session && req.session.idNum) {
			details.flag = true;
			details.name = req.session.name;
			details.uidNum = req.session.idNum;
		}

		else
			details.flag = false;
        /*
            calls the function findOne()
            defined in the `database` object in `../models/db.js`
            this function searches the collection `users`
            based on the value set in object `query`
            the third parameter is a string containing fields to be returned
        */
        var result = await db.findOne(User, query, projection);

        /*
            if the user exists in the database
            render the profile page with their details
        */
        if(result != null) {
            var details = {
                firstname: result.firstname,
                lastname: result.lastname,
				idNum: result.idNum,
                roles: result.roles,
				profileDesc: result.profileDesc
            };
		if(req.session && req.session.idNum) {
        details.flag = true;
        details.name = req.session.name;
        details.idNum = req.session.idNum;
		}
		
		else {
			details.flag = false;
		}
            // render `../views/profile.hbs`
            res.render('profile', details);
        }

        /*
            if the user does not exist in the database
            render the error page
        */
        else {
            res.render('error', details);
        }
    },

    postProfile: async function (req, res) {
        var updated_desc = req.body.freeform;
        var idNum = req.params.idNum;
    
        // var profile = this.getProfile();
    
        try {
            // Update the profile description based on the idNum
            var response = await User.updateOne({ idNum: idNum }, { $set: { profileDesc: updated_desc } });
    
            if (response != null) {
                res.redirect(`/profile/${idNum}`);
            } else {
                res.redirect('/error');
            }
        } catch (error) {
            console.log(error);
            res.redirect('/error');
        }
    }
}

/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = profileController;
