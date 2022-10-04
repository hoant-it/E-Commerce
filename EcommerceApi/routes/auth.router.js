const router=require('express').Router();
const userModel = require('../models/user.model')
const cryptoJs= require('crypto-js')
//register
router.post('/register', async(req,res)=>{
    const{username,email,password}= req.body
    const newUser = new userModel({
        username: username,
        email:email,
        password:cryptoJs.AES.encrypt(password,process.env.PASS_SEC.toString())
    })
    try {
        const savedUser=  await  newUser.save()
        res.json({
            user:savedUser,
            mes:"ok"
        })
        
    } catch (error) {
        res.json({
            user:[],
            mes:"fail"
        })
    }

})

//login
router.post('/login', async (req,res) =>{ 
    // const{username,password}= req.body
    try {
        const user= await userModel.findOne({username:req.body.username})
        !user && res.status(401).json("Wrong credentials!")

        const handlePassword= cryptoJs.AES.decrypt(user.password,process.env.PASS_SEC)
        const passwordDecrypt= handlePassword.toString(cryptoJs.enc.Utf8)
        req.body.password!==passwordDecrypt && res.status(401).json("Wrong credentials!")

        const { password,...others }=user._doc
        // console.log(others)

        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports =router