const Shop = require('../models/Shop');

module.exports = async (req,res)=>{
    const allItems = await Shop.find({});
    res.render('shop', {allItems});
};