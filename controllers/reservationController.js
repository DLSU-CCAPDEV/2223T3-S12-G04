
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `profile` paths in the server
*/
const reservationController = {

    /*
        executed when the client sends an HTTP GET request `/profile/:idNum`
        as defined in `../routes/routes.js`
    */
    getProfile1: async function (req, res) {

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
		if(req.session && req.session.idNum) {
        details.flag = true;
        details.name = req.session.name;
        details.idNum = req.session.idNum;
		}
		
		else {
			details.flag = false;
		}
            res.render('res1', details);
        }

        /*
            if the user does not exist in the database
            render the error page
        */
        else {
            res.render('error');
        }
    },
	getProfile2: async function (req, res) {

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
		if(req.session && req.session.idNum) {
        details.flag = true;
        details.name = req.session.name;
        details.idNum = req.session.idNum;
		}
		
		else {
			details.flag = false;
		}
            res.render('res2', details);
        }

        /*
            if the user does not exist in the database
            render the error page
        */
        else {
            res.render('error');
        }
    },
	getProfile3: async function (req, res) {

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
		if(req.session && req.session.idNum) {
        details.flag = true;
        details.name = req.session.name;
        details.idNum = req.session.idNum;
		}
		
		else {
			details.flag = false;
		}
            res.render('res3', details);
        }

        /*
            if the user does not exist in the database
            render the error page
        */
        else {
            res.render('error');
        }
    },
	confirmReservation: async function (req, res) {
        // Extract the reservation details from the request body
        const { seats, timeslot } = req.body;

        // Save the reservation data to the database using the Reservation model
        try {
            await db.insertOne(Reservation, {
                seats: seats,
                timeslot: timeslot,
                
            });

            // If the reservation is successfully saved, you can send a success response
            res.json({ success: true });
        } catch (err) {
            console.error('Error:', err);
            // If an error occurs while saving the reservation, you can send an error response
            res.status(500).json({ success: false, error: 'Failed to confirm reservation' });
        }
    }

	
}

/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = reservationController;
