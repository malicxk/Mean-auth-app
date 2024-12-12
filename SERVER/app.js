const express= require('express')
const app=express()
const userRouter=require('./routes')
const cors=require('cors')
const multer= require('multer')
const path=require('path')

app.use(express.json())

app.use(cors())
app.use(express.static(path.join(__dirname,'public')))
app.use('/user',userRouter)



app.listen(3000,(err)=>{
    if(err){
        console.err(err)
    }else{
        console.log('Server Running @3000');
    }
})