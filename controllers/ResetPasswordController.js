const crypto = require('crypto')
const User = require('../models/user')

module.exports = async (req,res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  })

  if (!user) {
    req.flash('error',['expired time to set new password'])

    return res.redirect('/forgot')

  }

  res.render('resetpassword', { token: req.params.token })

}