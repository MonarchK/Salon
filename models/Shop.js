const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    itemName:  String,
    price: String,
    image: String,
});

const Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;