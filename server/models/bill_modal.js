const mongoose = require('mongoose');

let billItems = new mongoose.Schema({ 
    item: String,
    price: Number,
    quantity: Number,
    tPrice: Number,
});

let billSchema = new mongoose.Schema({
    //item_id: mongoose.Types.ObjectId,
    client_name: String,
    mobile: String,
    address: String,
    bill_no: String,
    bill_date: {type: Date, default: Date.now},
    bill_items: [billItems],
    sum: Number,
},
    { timestamps: true }
);

let Bill = mongoose.model('bill', billSchema);
module.exports = Bill;