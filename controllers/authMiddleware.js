const User = require('../models/User')

module.exports = async (req,res,next)=>{
    try{
        if(!req.session || !req.session.userId){
            return res.redirect('/');
        }
        const user = await User.findById(req.session.userId);
		if(!user){
		    return res.redirect('/');
		}
        next();
    }catch(err){
        console.log(err);
        return next(err);
    }
}