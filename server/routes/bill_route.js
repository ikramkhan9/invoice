const express = require('express');
const router = express.Router();
const Bill = require('../models/bill_modal');

router.get('/', (req, res) => {

    Bill.find({}, (err, item) => {
        if(err){
            consolo.log('Error from item route:', err);
            res.send(err);
        }
        res.json(item);
    });
});

router.post('/', (req, res) => {

    let totalBills = 0;

    

    // Bill.countDocuments({}, (err, count) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("TOTAL BILLS :", count);

    //         const itemData = new Bill({
    //             client_name : req.body.client_name,
    //             mobile: req.body.mobile,
    //             address: req.body.address,
    //             bill_no: (count + 1),
    //             bill_items: req.body.bill_items,
    //             sum: req.body.sum,
    //         });
    //         itemData.save((err, item) => {
    //             if(err){
    //                 return err;
    //             }
    //             console.log('Invoice Generated', item);
    //             res.json(item);
    //         });
    //         //totalBills = count;
    //     }
    // });

    

    const itemData = new Bill({
        client_name : req.body.client_name,
        mobile: req.body.mobile,
        address: req.body.address,
        bill_no: req.body.bill_no,
        bill_items: req.body.bill_items,
        sum: req.body.sum,
    });
    itemData.save((err, item) => {
        if(err){
            return err;
        }
        console.log('Invoice Generated', item);
        res.json(item);
    });
});

module.exports = router;