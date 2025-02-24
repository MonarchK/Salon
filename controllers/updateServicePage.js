const Service = require('../models/Service');

module.exports = async (req,res)=>{
    const service = await Service.findById(req.params.emp);
    res.render('updateService', {service});
}