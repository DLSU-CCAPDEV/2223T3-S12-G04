const session = require(`express-session`);
// import module `bcrypt`
const bcrypt = require('bcrypt');

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const loginController = {
	
	getLogin: function (req, res){
		
		if(req.session && req.session.idNum){
			res.redirect('/profile/' + req.session.idNum);
		}
		else{
			
			var details = {
				flag: false
			};
			
		res.render('login', details);
		}
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
					idNum: idNum
            };
			
			//bcrypt hash function to add here
			bcrypt.compare(pw, result.pw, async function(err, equal) {

                    /*
                        if the entered password
                        match the hashed password from the database
                    */
					if (!req.session) {
					console.error('Session middleware is not properly configured.');
					// Handle the error appropriately
					return;
					}
					
                    if(equal){
                        req.session.idNum = idNum;
						req.session.roles = roles;
						req.session.firstname = firstname;
						req.session.lastname = lastname;
						req.session.save( async function (err) {
						if (err) {
						console.error('Error saving session:', err);
						// Handle the error appropriately
						return;
						}
                        res.redirect('/success?roles=' + roles + '&firstname=' + firstname +'&lastname=' + lastname + '&idNum=' + idNum);
						});
					}
                    /*
                        else if the entered password
                        does not match the hashed password from the database
                    */
                    else {
                        var details = {
							flag: false,
							error: `ID Number and/or Password
                            is incorrect.`
						};

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
                var details = {
					flag: false,
					error: `ID Number and/or Password is incorrect.`
				};

                /*
                    render `../views/login.hbs`
                    display the errors
                */
                res.render('login', details);
            }
		}
	}

module.exports = loginController;
