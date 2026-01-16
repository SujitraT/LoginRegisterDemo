const mongoose= require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,"please provide your username"],
        lowercase:true,
        trim:true
    },
    lastname:{
        type:String,
        required:[true,"please provide your last name"],
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"please provide email address"],
        unique: true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"please provide password"],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|~\-=`{}\[\]:";'<>?,.\/]).{8,}$/,
            "Password must contain at least 8 characters, including lowercase, uppercase, number, and special character below at 8 character"
        ],
        trim:true
    }
})


UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return 
    this.password = await bcrypt.hash(this.password, 10)
    
})
    





const User = mongoose.model('user',UserSchema)

module.exports = User
