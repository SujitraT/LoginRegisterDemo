const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * ส่งอีเมล reset password
 * @param {string} toEmail
 * @param {string} resetUrl
 */

const sendResetPasswordEmail = async (toEmail, resetUrl) => {
   return resend.emails.send({
    from: 'Support <onboarding@resend.dev>',
    to: toEmail,
    subject: 'Reset your password',
    html: `
      <p>You requested a password reset</p>
      <a href="${resetUrl}">Click here to reset password</a>
      <p>This link expires in 15 minutes</p>
    `
  })
}

module.exports = {
  sendResetPasswordEmail
}
