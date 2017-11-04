var mongoose = require('mongoose').connect('mongodb://localhost/banqueroute');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var UserSchema = new Schema({
        email: String,
        password: String,
        token: String
});
 
module.exports = mongoose.model('User', UserSchema);


