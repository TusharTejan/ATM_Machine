const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    denomination: Number,
    quantity: Number,
});

const atmSchema = new mongoose.Schema({
    balance: Number,
    notes: [noteSchema],
});

module.exports = mongoose.model('ATM', atmSchema);
