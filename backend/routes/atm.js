const express = require('express');
const router = express.Router();
const ATM = require('../models/atm');

// Get current balance and notes
router.get('/balance', async (req, res) => {
    try {
        const atm = await ATM.findOne();
        res.json(atm);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Process withdrawal
router.post('/withdraw', async (req, res) => {
    const { amount } = req.body;
    const denominations = [50, 20, 10, 5];

    try {
        let atm = await ATM.findOne();

        if (atm.balance < amount) {
            return res.status(400).json({ msg: 'Insufficient funds' });
        }

        let remainingAmount = amount;
        const notesToDispense = {};

        for (let denom of denominations) {
            let noteCount = Math.min(Math.floor(remainingAmount / denom), atm.notes.find(note => note.denomination === denom).quantity);
            if (noteCount > 0) {
                notesToDispense[denom] = noteCount;
                remainingAmount -= noteCount * denom;
            }
        }

        if (remainingAmount > 0) {
            return res.status(400).json({ msg: 'Cannot dispense the exact amount with available denominations' });
        }

        for (let denom in notesToDispense) {
            let note = atm.notes.find(note => note.denomination === parseInt(denom));
            note.quantity -= notesToDispense[denom];
        }

        atm.balance -= amount;
        await atm.save();

        res.json({
            balance: atm.balance,
            notes: atm.notes,
            dispensed: notesToDispense,
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
