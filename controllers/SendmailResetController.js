const crypto = require('crypto')
const User = require('../models/user.js')
const { sendResetPasswordEmail } = require('../modules/sendEmail.js')

module.exports = async (req,res) =>{
    try{
            const {email} = req.body
            const user = await User.findOne({email})
            if(!user) {
                req.flash('error',['account does not exist'])
                return res.redirect('/forgot')
            }

            const resetToken = crypto.randomBytes(32).toString('hex')

            user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
            user.resetPasswordExpire = Date.now() + 15 * 60 * 1000

            await user.save()

            const resetUrl = `${process.env.BASE_URL}/reset/${resetToken}`

            // TODO: ส่ง email (nodemailer)
            await sendResetPasswordEmail(user.email, resetUrl)
            req.flash('success',['send email success'])
            return res.redirect('/')

    } catch(err){
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message)
            req.flash('error',messages)
            return res.redirect('/forgot')
        }
        
        req.flash('error',[err])
        return res.redirect('/forgot')

    }
    
}