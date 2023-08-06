
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `profile` paths in the server
*/
const profileController = {

    /*
        executed when the client sends an HTTP GET request `/profile/:idNum`
        as defined in `../routes/routes.js`
    */
    getProfile: async function (req, res) {

        // query where `idNum` is equal to URL parameter `idNum`
        var query = {idNum: req.params.idNum};

        // fields to be returned
        var projection = 'firstname lastname idNum roles profileDesc reservations';
		
		 var details = {};

		if(req.session && req.session.idNum) {
			details.flag = true;
			details.name = req.session.name;
			details.uidNum = req.session.idNum;
		}

		else
			details.flag = false;
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
                roles: result.roles,
				profileDesc: result.profileDesc,
                reservations: result.reservations,
                seatNum: result.seatNumber,
                DateReq: result.DateofRequest,
                DateTime: result.timeofRequest,
                ReserveDate: result.dateofReservation,
                ReserveTime: result.timeofReservation
            };
		if(req.session && req.session.idNum) {
        details.flag = true;
        details.name = req.session.name;
        details.idNum = req.session.idNum;
		}
		
		else {
			details.flag = false;
		}
            // render `../views/profile.hbs`
            res.render('profile', details);
        }

        /*
            if the user does not exist in the database
            render the error page
        */
        else {
            res.render('error', details);
        }
    },

    postProfile: async function (req, res) {
        var updated_desc = req.body.freeform;
        var idNum = req.params.idNum;
    
        // var profile = this.getProfile();
    
        try {
            // Update the profile description based on the idNum
            var response = await User.updateOne({ idNum: idNum }, { $set: { profileDesc: updated_desc } });
    
            if (response != null) {
                res.redirect(`/profile/${idNum}`);
            } else {
                res.redirect('/error');
            }
        } catch (error) {
            console.log(error);
            res.redirect('/error');
        }
    },

    editReservations: async function (req, res) {
        if(req.session && req.session.idNum) {
			details.flag = true;
			details.name = req.session.name;
			details.uidNum = req.session.idNum;
		}

		else
			details.flag = false;

        var projection = 'firstname lastname idNum roles profileDesc reservations';
		
		var details = {};

        var idNum = req.params.idNum;
    
        try {
            var user = await User.findOne({ idNum: idNum }, projection);
            if (!user) {
                // User with the specified idNum not found
                res.redirect('/error');
                return;
            }
    
            // Check each reservation and redirect based on the computerLab value
            for (const reservation of user.reservations) {
                if (reservation.computerLab === 1) {
                    res.redirect(`/res1/${idNum}`);
                    return;
                } else if (reservation.computerLab === 2) {
                    res.redirect(`/res2/${idNum}`);
                    return;
                } else if (reservation.computerLab === 3) {
                    res.redirect(`/res3/${idNum}`);
                    return;
                }
            }
    
            // If no reservation with the specified computerLab value is found, redirect to error
            res.redirect('/error');
        } catch (error) {
            console.log(error);
            res.redirect('/error');
        }
    },

    deleteReservation: async function (req, res) {
        if(req.session && req.session.idNum) {
			details.flag = true;
			details.name = req.session.name;
			details.uidNum = req.session.idNum;
		}

		else
			details.flag = false;

        const idNum = req.params.idNum;

        const user = await User.findOne({ idNum });

        const reservationId = user.reservations.reservationId;
    
        try {
            // Use Mongoose's `deleteOne` method to remove the reservation with the given reservationId
            const result = await User.deleteOne({ 'reservations.reservationsId': reservationId });
    
            if (result.deletedCount === 0) {
            // If deletedCount is 0, it means the reservation was not found for the given user
            return res.status(404).json({ success: false, error: 'Reservation not found' });
            }
    
            // Send a JSON response to indicate success
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            // Send a JSON response with the error message
            res.status(500).json({ success: false, error: error.message });
        }
    },

    deleteProfile: async function (req, res) {
        if(req.session && req.session.idNum) {
			details.flag = true;
			details.name = req.session.name;
			details.uidNum = req.session.idNum;
		}

        else
            details.flag = false;

        const idNum = req.params.idNum;

        try {
            const result = await User.deleteOne({ idNum });
        } catch (error) {
            console.log(error);
            res.redirect('/error');
        }
    }
}
/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = profileController;
