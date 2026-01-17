const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  logger: true,
  debug: true
})

/**
 * ส่งอีเมล reset password
 * @param {string} toEmail
 * @param {string} resetUrl
 */
const sendResetPasswordEmail = async (toEmail, resetUrl) => {
  await transporter.sendMail({
    from: `"Support" <${process.env.EMAIL_USER}>`,
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
