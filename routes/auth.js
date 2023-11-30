import { Router } from "express";
import User from "../models/User.js"
import bcrypt from "bcrypt"
import {signUpBodyValidation,loginBodyValidation} from "../utils/validationSchema.js"
import generateTokens from "../utils/generateToken.js";

const router=Router()


router.post("/signup",async(req,res)=>{
    try {
            const {error}=signUpBodyValidation(req.body)
            if(error){
                return res.status(400).json({error:true,message:error.details[0].message})
            }
            const user=await User.findOne({email:req.body.email})

            if(user){
                return res.status(400).json({error:true,message:"User with given email already exist"})
            }
            const salt=await bcrypt.genSalt(Number(process.env.SALT))
    const hashPassword=await bcrypt.hash(req.body.password,salt)

    await new User({...req.body,password:hashPassword}).save()
    
    res.status(201).json({
        error:false,
        message:"account created successfully"

    })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:true,message:"internal server error"})
        
    }

    


})

router.post("/login",async(req,res)=>{
    try {
        const {error}=loginBodyValidation(req.body)
        if(error){
            return res.status(400).json({error:true,message:error.details[0].message})
        }
        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(401).json({error:true,message:"Invalid email or Password"})
        }

        const verifiedPassword=await bcrypt.compare(req.body.password,user.password)

        if(!verifiedPassword){
            return res.status(401).json({error:true,message:"Invalid email or Password"})
        }
      

    const  {accessToken,refreshToken}=await generateTokens(user)

        res.status(200).json({
            error:false,
            accessToken,
            refreshToken,
            message:"Logged suceesfully"
        })





        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:true,message:"internal server error"})
    }
})





export default router