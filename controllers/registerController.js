// import module `validationResult` from `express-validator`
const { validationResult } = require('express-validator');

// import module `bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const registerController = {
	
	getRegister: function (req, res){
		var details = {};
		
		if(req.session && req.session.idNum){
			details.flag = true;
			details.name = req.session.name;
			details.idNum = req.session.idNum;
		}
		else{
			details.flag = false;
			res.render('register', details);
		}
	},
	
	postRegister: async function (req, res) {
		
		//Checker for register errors
		
		var errors = validationResult(req);

		if (!errors.isEmpty()) {
        errors = errors.errors;

        var details = {};
		
		if(req.session && req.session.idNum){
			details.flag = true;
			details.name = req.session.name;
			details.idNum = req.session.idNum;
		}
		else{	
			details.flag = false;
        for(i = 0; i < errors.length; i++)
            details[errors[i].param + 'Error'] = errors[i].msg;

        res.render('register', details);
		}
    }
        /*
            when submitting forms using HTTP POST method
            the values in the input fields are stored in `req.body` object
            each <input> element is identified using its `name` attribute
            Example: the value entered in <input type="text" name="fName">
            can be retrieved using `req.body.fName`
        */
		
		else {
			
        var roles = req.body.roles;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
		var idNum = req.body.idNum;
        var pw = req.body.pw;
		
		bcrypt.hash(pw, saltRounds, async function(err, hash) {
			
        var user = {
        	roles: roles,
            firstname: firstname,
            lastname: lastname,
            email: email,
			idNum: idNum,
            pw: hash
        }
        var response = await db.insertOne(User, user);
			
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
            });
        }
    },
	
	getCheckID: async function (req, res) {

        /*
            when passing values using HTTP GET method
            the values are stored in `req.query` object
            Example url: `http://localhost/getCheckID?idNum=11312345`
            To retrieve the value of parameter `idNum`: `req.query.idNum`
        */
        var idNum = req.query.idNum;

        /*
            calls the function findOne()
            defined in the `database` object in `../models/db.js`
            searches for a single document based on the model `User`
            sends an empty string to the user if there are no match
            otherwise, sends an object containing the `idNum`
        */
        var result = await db.findOne(User, {idNum: idNum}, 'idNum');
        res.send(result);
    }
}

module.exports = registerController;