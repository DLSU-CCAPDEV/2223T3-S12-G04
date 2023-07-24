// import module `mongoose`
var mongoose = require('mongoose');

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
		required: false
	}
});

module.exports = mongoose.model('User', UserSchema);
