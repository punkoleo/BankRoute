var mongoose = require('mongoose').connect('mongodb://localhost/banqueroute');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var TransactionsSchema = new Schema({
        emailEmetteur : String,
        emailDestinataire: String,
        somme : Number,
        date: String
});
 
module.exports = mongoose.model('Transactions', TransactionsSchema);


