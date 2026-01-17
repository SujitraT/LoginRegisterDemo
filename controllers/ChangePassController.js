const bcrypt = require('bcrypt')
const crypto = require('crypto')
const User = require('../models/user')

module.exports = async (req, res) => {
  try {
    const { token } = req.params
    const { password, confirmpass } = req.body

    if (!password || !confirmpass) {
      req.flash('error', ['Require password'])
      return res.redirect(`/reset/${token}`)
    }


    if (password !== confirmpass) {
      req.flash('error', ['Password not match'])
      return res.redirect(`/reset/${token}`)
    }

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
      req.flash('error', ['Token invalid or expired'])
      return res.redirect('/forgot')
    }


    user.password = password  
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    req.flash('success', ['Password changed successfully'])
    return res.redirect('/')
  } catch (err) {
    console.error(err)
    req.flash('error', ['System error'])
    return res.redirect('/forgot')
  }
}
