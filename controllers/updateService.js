const Service = require('../models/Service');
const path = require('path');
const cloudinary = require('cloudinary').v2;

module.exports = async (req,res)=>{
    try{
        let loc;
        const service = await Service.findById(req.params.emp);
        if(req.files){
            const image = req.files.image;
            await cloudinary.uploader.upload(image.tempFilePath, {folder: 'pictures/services'}).then((result)=>{
                loc = result.secure_url;
            }).catch(err=>{
                console.error('Error uploading file to Cloudinary:', err);
                return res.status(500).send('Failed to upload file.');
            });
            if(service){
                service.image = loc;
                await service.save();
            }
        }
        if(service){
            if(req.body.service){
                const exists = await Service.findOne({service: req.body.service});
                if(exists){
                    if(exists._id == service._id){
                        req.flash('error', 'service name already in use');
                        return res.redirect('/services/' + req.params.emp);
                    }
                }
                service.service = req.body.service;
                await service.save();
            }
            return res.redirect('/services');
        }
    }catch(error){
        console.log(error);
        req.flash('error', 'Server Side error please try again later');
        return res.redirect('/services/' + req.params.emp);
    }
    
}
