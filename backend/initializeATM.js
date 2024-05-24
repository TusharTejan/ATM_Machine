const mongoose = require('mongoose');
const connectDB = require('./config/db');
const ATM = require('./models/atm');

connectDB();

const initializeATM = async () => {
    const atm = new ATM({
        balance: 1000,
        notes: [
            { denomination: 50, quantity: 10 },
            { denomination: 20, quantity: 20 },
            { denomination: 10, quantity: 30 },
            { denomination: 5, quantity: 40 },
        ],
    });
    await atm.save();
    mongoose.connection.close();
};

initializeATM();
