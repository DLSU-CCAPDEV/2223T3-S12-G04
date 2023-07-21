// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const registerController = {
	
	getRegister: function (req, res){
		res.render('register');
	},
	
	postRegister: async function (req, res) {

        /*
            when submitting forms using HTTP POST method
            the values in the input fields are stored in `req.body` object
            each <input> element is identified using its `name` attribute
            Example: the value entered in <input type="text" name="fName">
            can be retrieved using `req.body.fName`
        */
        var roles = req.body.roles;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
		var idNum = req.body.idNum;
        var pw = req.body.pw;

        var user = {
        	roles: roles,
            firstname: firstname,
            lastname: lastname,
            email: email,
			idNum: idNum,
            pw: pw
        }
        var response = await db.insertOne(User, user);

        if(response != null){
            res.redirect('/success?roles=' + roles + '&firstname=' + firstname +'&lastname=' + lastname + '&idNum=' + idNum);
        }
        else {
            res.render('error');
        }
    }
	
}

module.exports = registerController;
