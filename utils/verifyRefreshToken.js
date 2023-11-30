import UserToken from "../models/UserToken.js";
import jwt from "jsonwebtoken"


const verifyRefreshToken=(refeshToken)=>{
    const privatekay=process.env.REFERESH_TOKEN_PRIVATE_KEY


    return new Promise((resolve,reject)=>{
        UserToken.findOne({token:refeshToken},(err,doc)=>{
            if(!doc){
                return reject({error:true,message:"Invalid refresh token"})

                jwt.verify(refeshToken,privatekay,(err,tokenDetails)=>{

                    if(err){
                        return reject({error:true,message:"Invalid refresh token"})
                    }
                })
            }
        })
    })

}