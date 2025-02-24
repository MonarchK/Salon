const Shop = require('../models/Shop');
const path = require('path');
const cloudinary = require('cloudinary').v2;

module.exports = async (req,res)=>{
    try{
        let loc;
        const shop = await Shop.findById(req.params.emp);
        if(req.files){
            const image = req.files.image;
            await cloudinary.uploader.upload(image.tempFilePath, {folder: 'pictures/shop'}).then((result)=>{
                loc = result.secure_url;
            }).catch(err=>{
                console.error('Error uploading file to Cloudinary:', err);
                return res.status(500).send('Failed to upload file.');
            });
            shop.image = loc;
            await shop.save();
        }
        if(shop){
            if(req.body.itemName){
                shop.itemName = req.body.itemName;
                await shop.save();
            }
            if(req.body.price){
                shop.price = req.body.price;
                await shop.save();
            }
            return res.redirect('/shop');
        }
    }catch(error){
        console.log(error);
        req.flash('error', 'Server Side error please try again later');
        return res.redirect('/shop/' + req.params.emp)
    }
    
}