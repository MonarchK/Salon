const User = require('../models/User');

module.exports = async (req,res)=>{
    if(!req.body.username){
        req.flash('error', 'username needed.');
        return res.redirect('/user/new');
    }
    if(!req.body.password){
        req.flash('error', 'password needed.');
        return res.redirect('/user/new');
    }
    const exists = await User.findOne({username: req.body.username});
    if(exists){
        req.flash('error', 'username already present please choose a different name.');
        return res.redirect('/user/new');
    }

    await User.create(req.body)
    .then(()=>{
        return res.redirect('/');
    }).catch(err=>{
        console.log(err);
        return res.redirect('/user/new');
    })
    
}