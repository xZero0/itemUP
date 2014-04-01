// model-user.js
var mongoose = require('mongoose');

module.exports = mongoose.model('Account', {
	name : String,
	email : String,
	password : String,
	enable : Boolean
});
