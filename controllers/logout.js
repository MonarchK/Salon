module.exports = (req,res)=>{
    req.session.destroy(err=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        return res.redirect('/');
    });
};