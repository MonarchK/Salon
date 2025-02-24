const Service = require('../models/Service');

module.exports = async (req,res)=>{
    await Service.findByIdAndDelete(req.params.emp);
    return res.redirect('/services');
}