module.exports = (req,res)=>{
    req.flash('error', 'Please double click to delete');
    if(req.query.page == 'services'){
        return res.redirect('/services/' + req.params.emp);
    }
    return res.redirect('/shop/' + req.params.emp);
}