const Shop = require('../models/Shop');

module.exports = async (req,res)=>{
    await Shop.findByIdAndDelete(req.params.emp);
    return res.redirect('/shop');
}