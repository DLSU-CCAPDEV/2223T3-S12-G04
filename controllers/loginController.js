
// import module `bcrypt`
const bcrypt = require('bcrypt');

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const loginController = {
	
	getLogin: function (req, res){
		res.render('login');
	},
	
	postLogin: async function (req, res) {

        /*
            when submitting forms using HTTP POST method
            the values in the input fields are stored in `req.body` object
            each <input> element is identified using its `name` attribute
            Example: the value entered in <input type="text" name="fName">
            can be retrieved using `req.body.fName`
        */
        var email = req.body.email;
        var pw = req.body.pw;
			
			var result = await User.findOne({ email });
			
			if (result != null){
				var roles = result.roles;
				var firstname = result.firstname;
				var lastname = result.lastname;
				var idNum = result.idNum;
				var details = {
					roles: roles,
					firstname: firstname,
					lastname: lastname,
					idNum: idNum,
            };
			
			//bcrypt hash function to add here
			bcrypt.compare(pw, result.pw, async function(err, equal) {

                    /*
                        if the entered password
                        match the hashed password from the database
                    */
                    if(equal)
                        /*
                            redirects the client to `/profile/idNum`
                            where `idNum` is equal
                            to the `idNum` entered by the user
                            defined in `../routes/routes.js`
                            which calls getProfile() method
                            defined in `./profileController.js`
                        */
                        res.redirect('/success?roles=' + roles + '&firstname=' + firstname +'&lastname=' + lastname + '&idNum=' + idNum);

                    /*
                        else if the entered password
                        does not match the hashed password from the database
                    */
                    else {
                        var details = {error: `ID Number and/or Password
                            is incorrect.`}

                        /*
                            render `../views/login.hbs`
                            display the errors
                        */
                        res.render('login', details);
                    }
                });
            }

            // else if a user with `idNum` equal to `idNum` does not exist
            else {
                var details = {error: `ID Number and/or Password is
                    incorrect.`}

                /*
                    render `../views/login.hbs`
                    display the errors
                */
                res.render('login', details);
            }
		}
	}

module.exports = loginController;
