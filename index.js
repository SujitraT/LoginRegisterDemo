require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')

// connect mongodb with mongoose
const dbUrl = 'mongodb+srv://loginSystem:Sujitr%4001993@cluster0.mofvcxz.mongodb.net/operation_ratio?appName=Cluster0'
mongoose.connect(dbUrl)


//controller
const LoginController = require('./controllers/LoginController')
// const LoginUserController = require('./controllers/LoginUserController')
const IndexController = require('./controllers/IndexController')
const dashboardRouter= require('./routes/api-dashboard')
const LoginRouter= require('./routes/api-login')
const LogoutController = require('./controllers/LogoutController')
const RegisterController = require('./controllers/RegisterController')
const StoreUserController = require('./controllers/StoreUserController')



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

// router
app.get('/',redirectAuth,LoginController)
app.get('/dashboard',authMiddleware,IndexController)
app.get('/logout',LogoutController)
app.use('/api-dashboard',APIMiddleware,  dashboardRouter)
app.use('/user',redirectAuth,LoginRouter)
app.get('/register',redirectAuth,RegisterController)
app.post('/user/register',redirectAuth,StoreUserController)

app.listen(5500,()=>{
    console.log('app listen start at port: 5500')
})