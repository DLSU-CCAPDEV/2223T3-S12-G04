const fs = require('fs');

// Import module `database` from `../models/db.js`
const db = require('../models/db.js');

// Import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

// Function to fetch reservation data from the database
async function fetchReservationData(profileId) {
    try {
        // Your actual database query to fetch reservation data from the database
        const query = { idNum: profileId }; // Assuming `idNum` is the field used to identify the profile
        const projection = 'firstname lastname idNum roles roomNumber timeslot seatNum'; // Include `seatNum` in projection
        const result = await db.findOne(User, query, projection);

        // Check if the user's reservation data was found in the database
        if (result) {
            // Extract reservation details from the result and return them
            const reservationData = {
                firstname: result.firstname,
                lastname: result.lastname,
                idNum: result.idNum,
                roles: result.roles,
                roomNumber: result.roomNumber,
                timeslot: result.timeslot,
                seatNumbers: result.seatNum // Use `seatNum` field for seat numbers
            };

            return reservationData;
        } else {
            // User's reservation data not found
            return null;
        }
    } catch (err) {
        // Handle any errors that occur during the database query
        console.error('Error fetching reservation data:', err);
        throw err; // You can choose to handle the error in a different way if needed
    }
}

// Function to render the confirmation page
async function renderConfirmationPage(req, res) {
    // Fetch the reservation data based on the profileId
    const profileId = req.params.profileId; // Assuming you have a parameter for profileId
    const reservationData = await fetchReservationData(profileId);

    if (reservationData) {
        // Render the confirmation.hbs file with the reservation data
        res.render('confirmation', reservationData);
    } else {
        // Handle invalid reservation profile or database errors
        res.render('error');
    }
}

module.exports = { renderConfirmationPage };

