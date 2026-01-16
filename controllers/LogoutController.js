module.exports= (req,res)=>{
    res.clearCookie('token' ,{
        httpOnly: true,
    })
    res.redirect('/')
}