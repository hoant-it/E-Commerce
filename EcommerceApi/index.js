const express=require('express')
const app=express();
const mongoose= require('mongoose')
const dotenv= require('dotenv')
const userRouter= require('./routes/user.router')
const authRouter= require('./routes/auth.router')
 
dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('dB connection successful!'))
.catch((err)=>{
    console.log(err)
})
app.use(express.json())
app.use('/api/users',userRouter)
app.use('/api/auth',authRouter)
app.get('/',async (req,res)=>{
    res.send('hello world')
})

app.listen(process.env.PORT ||  5555,()=>{
    console.log('Backend server is running!')
})