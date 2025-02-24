const Service = require('../models/Service');
const path = require('path');

module.exports = async (req,res)=>{
    const allServices = await Service.find({});
    /*if(allServices.length > 0){
        for(var n = 0; n < allServices.length; n++){
            if(allServices[n].image.split('/')[2] != 'resized'){
                let service = allServices[n].image.split('/');
                let serviceInput = path.join('public', allServices[n].image);
                let serviceOutput = path.join('public/pictures/services/resized', service[3]);
                sharp(serviceInput).resize(360, 220, { fit: 'inside', withoutEnlargement: true }).toFile(serviceOutput);
                allServices[n].image = 'pictures/services/resized/' + service[3];
                await allServices[n].save();
            }
        }
    }*/
    res.render('services', {allServices});
};