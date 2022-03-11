const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('../models/items_modal');

router.get('/:itemId', (req, res) => {
    
    //let item_id = mongoose.Types.ObjectId(req.params.itemId).toString();

    let item_id = req.params.itemId;
    //console.log('item id: ', item_id);

    Item.findOne({_id: item_id}, (err, item) => {
        if(err){
            console.log('Error from item route:', err);
            res.send(err);
        }
        console.log(item);
        res.json(item);
    });
});

router.post('/:itemId', (req, res) => {
    console.log('item insert route');

    // const itemData = new Item({
    //     item_name: req.body.txtItem,
    //     price: req.body.txtPrice,
    //     ispresent: req.body.txtPresent,
    // });

    // itemData.save((err, item) => {
    //     if(err){
    //         return err;
    //     }
    //     console.log(item);
    //     res.json(item);
    // });
});

module.exports = router;