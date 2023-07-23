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
		
		var query = {email: req.params.email};
		
        // fields to be returned
        var projection = 'firstname lastname idNum roles';
		
        var response = await db.findOne(User, query, projection);

        if(response != null){
			
			var roles = req.query.roles;
			var firstname = req.query.firstname;
			var lastname = req.query.lastname;
			var idNum = req.query.idNum;
			var details = {
                roles: req.query.roles,
				firstname: req.query.firstname,
				lastname: req.query.lastname,
				idNum: req.query.idNum,
            };
			res.render('success', details);
			res.redirect('/success?roles=' + roles + '&firstname=' + firstname +'&lastname=' + lastname + '&idNum=' + idNum);
			}
        else {
            res.render('error');
        }
    }
	
}

module.exports = loginController;