const Shop = require('../models/Shop');
const path = require('path');
const cloudinary = require('cloudinary').v2;

module.exports = async (req,res)=>{
    let loc;
    //validation checks
    if(!req.body.itemName){
        req.flash('error', 'item name needed.');
        return res.redirect('/item/new');
    }
    if(!req.body.price){
        req.flash('error', 'price tag needed.');
        return res.redirect('/item/new');
    }
    if(!req.files){
        req.flash('error', 'image needed.');
        return res.redirect('/item/new');
    }
    const exists = await Shop.findOne({itemName: req.body.itemName});
    if(exists){
        req.flash('error', 'item name already present please add a new item.');
        return res.redirect('/item/new');
    }
    console.log(req.body.itemName)

    //actual logic to handle post request
    const image = req.files.image;
    await cloudinary.uploader.upload(image.tempFilePath, {folder: 'pictures/shop'}).then((result)=>{
        loc = result.secure_url;
    }).catch(err=>{
        console.error('Error uploading file to Cloudinary:', err);
        return res.status(500).send('Failed to upload file.');
    });
    await Shop.create({
        ...req.body,
        image: loc
    }).then(()=>{
        return res.redirect('/shop');
    }).catch(err=>{
        console.log(err);
        req.flash('error', 'Serverside error please try again later.');
        return res.redirect('/item/new');
    })
}