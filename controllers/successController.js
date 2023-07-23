// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');
/*
    defines an object which contains functions executed as callback
    when a client requests for `success` paths in the server
*/
const successController = {

    /*
        executed when the client sends an HTTP GET request `/success`
        as defined in `../routes/routes.js`
    */
    getSuccess: function (req, res) {

        /*
            when passing values using HTTP GET method
            the values are stored in the req.query object
            Example url: `http://localhost/success?fName=A&lName=B&idNum=123`
            To retrieve the value of parameter `fName`: req.query.fName
        */
        var details = {
			roles: req.query.roles,
            firstname: req.query.firstname,
            lastname: req.query.lastname,
			idNum: req.query.idNum,
        };

        // render `../views/success.hbs`
        res.render('success', details);
	},
	
	getHomeSuccess: async function (req, res) {

        // query where `idNum` is equal to URL parameter `idNum`
        var query = {idNum: req.params.idNum};

        // fields to be returned
        var projection = 'firstname lastname idNum roles';

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
                roles: result.roles
            };

            // render `../views/profile.hbs`
            res.render('home', details);
        }

        /*
            if the user does not exist in the database
            render the error page
        */
        else {
            res.render('error');
        }
    }
}

/*
    exports the object `successController` (defined above)
    when another script exports from this file
*/
module.exports = successController;
