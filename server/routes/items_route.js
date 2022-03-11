const express = require('express');
const router = express.Router();
const Item = require('../models/items_modal');

router.get('/', (req, res) => {

    Item.find({}, (err, item) => {
        if(err){
            consolo.log('Error from item route:', err);
            res.send(err);
        }
        //console.log(category);
        res.json(item);
    });
});

router.post('/', (req, res) => {
    console.log('item insert route');

    const itemData = new Item({
        item_name: req.body.txtItem,
        price: req.body.txtPrice,
        ispresent: req.body.txtPresent,
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