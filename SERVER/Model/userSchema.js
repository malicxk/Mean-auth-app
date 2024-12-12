const mongoose= require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/CRUD')
.then(()=>{
    console.log('DB Connected');
})
.catch((err)=>{
   console.log(err);
})
   

const userSchema= mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    mobile:{
        type:Number
    },
    password:{
        type:String
    },
    profile:{
        type:String
    }
})

const userCollection= mongoose.model('user',userSchema)

module.exports = userCollection

