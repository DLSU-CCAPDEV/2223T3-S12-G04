const fs = require('fs');
const Handlebars = require('handlebars');

// Import module `database` from `../models/db.js`
const db = require('../models/db.js');

// Import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

// Fetch the reservation data based on the profileId
async function fetchReservationData(profileId) {
    // Logic to fetch the reservation data from the database
    // ... Your code to fetch the reservation data ...
    
    const reservationData = {
        firstname: '',
        lastname: '',
        idNum: '',
        roles: '',
        roomNumber: '',
        timeslot: '',
        seatNumbers: ''
    };
    return reservationData;
}

// Function to render the confirmation page
async function renderConfirmationPage(req, res) {
    // Fetch the reservation data based on the profileId
    const profileId = req.params.profileId; // Assuming you have a parameter for profileId
    const reservationData = await fetchReservationData(profileId);

    if (reservationData) {
        // Specify the Handlebars partial to use based on the reservation profile
        let partialName = '';
        if (profileId === 'res1' || profileId === 'res2' || profileId === 'res3') {
            partialName = 'reservationDetails'; // Use the same partial for all profiles if they share the same structure
        } else {
            // Handle invalid profileId
            return res.render('error');
        }

        // Read the partial file and register it with Handlebars (if not already registered)
        if (!Handlebars.partials[partialName]) {
            const partialContent = fs.readFileSync(`views/${partialName}.hbs`, 'utf8');
            Handlebars.registerPartial(partialName, partialContent);
        }

        // Render the confirmation.hbs file with the reservation data
        res.render('confirmation', reservationData);
    } else {
        // Handle invalid reservation profile
        res.render('error');
    }
}

module.exports = { renderConfirmationPage };
