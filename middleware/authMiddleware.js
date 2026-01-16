const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.redirect('/')
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded.userId).select('-password')
        res.locals.user = user
        
        next()
    } catch (err) {
        console.log(err)
        return res.redirect('/')
    }
}

