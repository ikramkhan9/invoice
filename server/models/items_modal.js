const mongoose = require('mongoose');

let itemSchema = new mongoose.Schema({
    item_name : String,
    price : Number,
    ispresent: Boolean,    
},
{ timestamps: true }
);

let Items = mongoose.model('item', itemSchema);

module.exports = Items;