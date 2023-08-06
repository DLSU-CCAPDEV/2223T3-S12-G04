// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `reservations`
const ReservationSchema = new mongoose.Schema({
	reservationId: { 
	  type: mongoose.Schema.Types.ObjectId,	
	  required: true 
		},
	resNo: {
	  type: Number,
	  required: true
	},
	computerLab: { 
	  type: Number, 
	  required: true 
	  },
	studentName: { 
	  type: String, 
	  required: true 
	  },
	seatNumber: { 
	  type: String, 
	  required: true 
	  },
	dateOfRequest: { 
	  type: String, 
	  required: true 
	  },
	timeOfRequest: { 
	  type: String, 
	  required: true 
	  },
	dateOfReservation: { 
	  type: String, 
	  required: true 
	  },
	timeOfReservation: { 
	  type: String, 
	  required: true 
	  },
  });

// defines the schema for collection `users`
var UserSchema = new mongoose.Schema({
    roles: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
	
	idNum: {
		type: Number,
		required: true
	},
	
    pw: {
        type: String,
        required: true
    },
	
	seatNum: {
		type: String,
		required: false
	},
	
	DateReq: {
		type: String,
		required: false
	},
	
	DateTime: {
		type: String,
		required: false
	},
	
	ReserveDate: {
		type: String,
		required: false
	},
	
	ReserveTime: {
		type: String,
		required: false
	},

	profileDesc: {
		type: String,
		required: false,
		default: "No Description"
	},

	reservations: [ReservationSchema]
});

module.exports = mongoose.model('User', UserSchema);
