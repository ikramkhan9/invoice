const express = require('express');
const router = express.Router();
const Bill = require('../models/bill_modal');

router.get('/', (req, res) => {

    Bill.countDocuments({}, (err, count) => {
        if (err) {
            console.log(err)
        } else {
            console.log("TOTAL BILLS :", count);
            res.json(count);
        }
    });
});

module.exports = router;