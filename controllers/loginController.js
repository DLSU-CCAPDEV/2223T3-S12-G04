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
				if (details != undefined){
					res.redirect('/success?roles=' + roles + '&firstname=' + firstname +'&lastname=' + lastname + '&idNum=' + idNum);
		}
		else {
            res.render('error');
	}
}
	}
}

module.exports = loginController;
