var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ContactSchema = new mongoose.Schema({
    Full_name: String,
    Phone_number: Number,
    Address: String,
    Notes: String,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', ContactSchema);