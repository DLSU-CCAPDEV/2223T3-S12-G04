const controller = {

    getRoot: function(req, res) {
        res.render(`guest`); // Get guest home page
    },

    redirectRoot: function(req, res) {
        res.redirect(`/`); // Back to guest home page when logging out
    },

    checkAcct: function(req, res) {
        var email = req.body.email;
        var password = req.body.pw;

        // res.render(`profile`, {email: email});
		
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
	}
	
}
module.exports = controller;
