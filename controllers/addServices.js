const Service = require('../models/Service');
const path = require('path');
const cloudinary = require('cloudinary').v2;

module.exports = async (req,res)=>{
    let loc;
    //validation checks
    if(!req.body.service){
        req.flash('error', 'service name needed.');
        return res.redirect('/service/new');
    }
    if(!req.files){
        req.flash('error', 'image needed.');
        return res.redirect('/service/new');
    }
    const exists = await Service.findOne({service: req.body.service});
    if(exists){
        req.flash('error', 'service name already present please choose a different name.');
        return res.redirect('/service/new');
    }

    //actual logic to handle post request
    const image = req.files.image;
    await cloudinary.uploader.upload(image.tempFilePath, {folder: 'pictures/services'}).then((result)=>{
        loc = result.secure_url;
    }).catch(err=>{
        console.error('Error uploading file to Cloudinary:', err);
        return res.status(500).send('Failed to upload file.');
    });
    await Service.create({
        ...req.body,
        image: loc
    }).then(()=>{
        return res.redirect('/services');
    }).catch(err=>{
        console.log(err);
        req.flash('error', 'Serverside error please try again later.');
        return res.redirect('/service/new');
    })
}