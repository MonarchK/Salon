const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req,res)=>{
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username: username});

        if(!user){
            console.log("User doesn't exist");
            req.flash('error', 'User not found'); // Optional: flash message
            return res.redirect('/auth/login');
        }

        const pass = await bcrypt.compare(password, user.password);

        if(pass){
            req.session.userId = user._id;
            console.log('Successfully logged in, Welcome ' + username);
            return res.redirect('/');
        }

        console.log("Wrong password");
        req.flash('error', "Wrong password");
        return res.redirect('/auth/login');
    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
    
}