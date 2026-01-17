require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

// connect mongodb with mongoose
mongoose.connect(process.env.dbUrl)


//controller
const LoginController = require('./controllers/LoginController')
// const LoginUserController = require('./controllers/LoginUserController')
const IndexController = require('./controllers/IndexController')
const dashboardRouter= require('./routes/api-dashboard')
const LoginRouter= require('./routes/api-login')
const LogoutController = require('./controllers/LogoutController')
const RegisterController = require('./controllers/RegisterController')
const StoreUserController = require('./controllers/StoreUserController')
const ForgotPasswordController = require('./controllers/ForgotPasswordController')
const SendResetRouter = require('./routes/api-sendlinkreset')
const GetpasstokenRouter = require('./routes/api-getpasstoken')
const ChangePassController = require('./controllers/ChangePassController')




// Middleware
const authMiddleware = require('./middleware/authMiddleware')
const APIMiddleware = require('./middleware/authAPIMiddleware')
const redirectAuth = require('./middleware/redirectIfAuth')


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.message = req.flash('error')
  res.locals.success = req.flash('success')
  next()
})

// router
app.get('/',redirectAuth,LoginController)
app.get('/dashboard',authMiddleware,IndexController)
app.get('/logout',LogoutController)
app.use('/api-dashboard',APIMiddleware,  dashboardRouter)
app.use('/user',redirectAuth,LoginRouter)
app.get('/register',redirectAuth,RegisterController)
app.post('/user/register',redirectAuth,StoreUserController)
app.get('/forgot',redirectAuth,ForgotPasswordController)
app.use('/user',redirectAuth,SendResetRouter)
app.use('/',redirectAuth,GetpasstokenRouter)
app.post('/user/changepass/:token',redirectAuth,ChangePassController)



app.listen(5500,()=>{
    console.log('app listen start at port: 5500')
})