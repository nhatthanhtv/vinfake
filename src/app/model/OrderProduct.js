const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderProduct = new Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    dataItems:[
        {

        }
    ]
},{
    timestamps: true
});

module.exports = mongoose.model('OrderProduct', OrderProduct)


