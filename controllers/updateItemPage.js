const Shop = require('../models/Shop');

module.exports = async (req,res)=>{
    const shop = await Shop.findById(req.params.emp);
    res.render('updateItem', {shop});
}