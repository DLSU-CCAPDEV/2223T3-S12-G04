const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const controller = {

    getRoot: function(req, res) {
        res.render(`guesthome`); // Get guest home page
    },

    redirectRoot: function(req, res) {
        res.redirect(`/`); // Back to guest home page when logging out
    },
	redirectLabTechHome: function(req, res){
		res.render(`labtechhome`);
	},
	redirectLabTechReserve1: function(req,res){
		res.render(`labtechres1`);
	},
	redirectLabTechReserve2: function(req,res){
		res.render(`labtechres2`);
	},
	redirectLabTechReserve3: function(req,res){
		res.render(`labtechres3`);
	},
	redirectLabTechProfile: function(req,res){
		res.render(`labtechprofile`);
	},
	redirectLogin: function(req, res){
		res.render(`login`);
	},
	redirectRegister: function(req, res) {
		res.render(`register`);
	},
	redirectStudentHome: function(req, res){
		res.render(`studenthome`);
	},
	redirectStudentReserve1: function(req,res){
		res.render(`studentres1`);
	},
	redirectStudentReserve2: function(req,res){
		res.render(`studentres2`);
	},
	redirectStudentReserve3: function(req,res){
		res.render(`studentres3`);
	},
	redirectStudentProfile: function(req,res){
		res.render(`studentprofile`);
	},
    checkAcct: function(req, res) {
        var email = req.body.email;
        var password = req.body.pw;
		
		// We can put here an if statement, depending on their role if student or lab tech
        res.redirect(`/profile/` + email); // we add another one when created if statement for separation of getting student and lab tech home pages
    },

    getProfile: function(req, res) { //function to put in URL
        var email = req.params.email;

        res.render(`profile`, {email: email});
    },
	
	getUserData: function(req, res) { //function to display name in user profile
	
	// we call email variable for our if statement checker
		var email = req.params.email;
		// if it is possible, we make an if statement here so that we can base the email logged in the website to get all of its data registered in the database.
		
	},
	
	getReserve: function(req, res) { //function to input reservation that user has made
		// if possible, this is where we take user input of reserving a seat and placing it into our database.
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
        var pw = req.body.pw;

        var user = {
        	roles: roles,
            firstname: firstname,
            lastname: lastname,
            email: email,
            pw: pw
        }
        var response = await db.insertOne(User, user);

        if(response != null){
            res.redirect('/success?roles=' + roles + '&firstname=' + firstname +'&lastname=' + lastname + '&email=' + email);
        }
        else {
            res.render('error');
        }
    }
	
}
module.exports = controller;
