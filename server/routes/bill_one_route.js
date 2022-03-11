const express = require('express');
const router = express.Router();
const Bill = require('../models/bill_modal');

router.get('/:billId', (req, res) => {

    let bill_id = req.params.billId;
    console.log('server bill id line 9: ', bill_id);

    Bill.findOne({_id: bill_id}, (err, item) => {
        if(err){
            consolo.log('Error from item route:', err);
            res.send(err);
        }
        console.log('One item server line 17', item);
        res.json(item);
    });
});

router.post('/', (req, res) => {
    console.log('item insert route');

    // const itemData = new Bill({
    //     client_name : req.body.client_name,
    //     mobile: req.body.mobile,
    //     address: req.body.address,
    //     bill_items: req.body.bill_items,
    //     sum: req.body.sum,

    //     // item_id: req.body.itemId,
    //     // item_name: req.body.txtItem,
    //     // price: req.body.txtPrice,
    //     //ispresent: req.body.txtPresent,
    // });
    // itemData.save((err, item) => {
    //     if(err){
    //         return err;
    //     }
    //     console.log('Invoice Generated', item);
    //     res.json(item);
    // });
});

module.exports = router;