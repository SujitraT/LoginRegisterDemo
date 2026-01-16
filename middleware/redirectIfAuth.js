const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    // using jwt to auth
    const token = req.cookies.token
    if(!token){

        return next()
    }

    try{
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        return res.redirect('/dashboard')

    }catch(err){
        console.log(err)
        next()
    }

}