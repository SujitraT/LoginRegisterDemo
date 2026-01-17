const User = require('../models/user')

module.exports = async (req,res) => {
    try{
            const {name,lastname,email,password} = req.body
            const user = await User.findOne({email})

            if(user){
                console.log('your account already exist')
                return res.render('register',{message: ['your account already exist']})
              
            }

            await User.create({
                name,
                lastname,
                email,
                password
            })
            return res.redirect('/')


    } catch(err){
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message)

            return res.render('register', {
                message: messages   // หรือส่งทั้ง array ก็ได้
            })
        }
        return res.render('register', {
            message: 'The system has malfunctioned. Please try again.'
        })

        
    }
    
}