const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')


module.exports = async (req,res) =>{
    try{
        const {email, password} = req.body

        const user = await User.findOne({email})
        
        if(!user){
            return res.redirect('/?error=incorrect')
            // res.status(400).json({
            //     message: 'incorrect email, or register'
            // })
        }

        const match = await bcrypt.compare(password,user.password)

        if(!match){
            return res.redirect('/?error=invalid')
            // res.status(400).json({message:'invalid email or password'})
        }


        const token = jwt.sign({
            userId: user._id,
            email: user.email
        },
            process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'}
        ) 
        

        res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
        })

        return res.redirect('/dashboard')


    }catch(err){
        console.log(err)
        res.status(401).send('Unauthorization')
    }
}