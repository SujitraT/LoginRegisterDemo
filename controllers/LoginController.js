module.exports = (req,res)=>{
    const error = req.query.error
    let message = ''
    if(error ==='incorrect'){
        message = 'incorrect email, or register'
    }
    if(error ==='invalid'){
        message = 'invalid email or password'
    }

    res.render('signin',{message})
}
