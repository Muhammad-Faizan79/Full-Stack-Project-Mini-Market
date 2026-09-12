import users from "../Models/user.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import sendEmail from "../Services/email.js";
import otpEmailTemplate from "../Tampletes/otpEmailTem.js";
import otp from "../Models/otp.js"
import recentOtp from "../Models/recentOtp.js"
import { Error } from "mongoose";


 export const signup = async ( req ,res)=>{
    try {
    const {name , email , password}= req.body
    if(!name || !email || !password){
       return res.json({
            message:"required filed or messing",
            status:false
        })
    }
    const DbDeta = await users.findOne({email})
    if(DbDeta){
        return res.json({
            message:"user alrady created!",
            status:false
        })
    }
    const hash = await bcryptjs.hash(password , 10);
    const userObj = {
        name    ,
        email,
        password:hash
    };
    
    const userCreated = await users.create(userObj);
    const otps = Math.floor(100000 + Math.random() * 900000);
    const otpobj= {
        userId:userCreated._id,
        email:userCreated.email,
        otp:otps
    };
    await otp.create(otpobj)
    const temp = await otpEmailTemplate(userCreated.name, otps)
    const emails= await sendEmail(`${userCreated.email}`, "verify Email", temp )
    
    const token =await jwt.sign({
        userId:userCreated._id,
        name:userCreated.name,
        email:userCreated.email
    }, process.env.token_secret) 
    res.json({
        message:"user created successfully and verify Your email",
        status:true,
        token:token
    })

    } catch (error) {
      res.json({
        message:"user not created!",
        status:false,
        error:error.message
    })  
    }

 };

 export const login =async (req , res)=>{
    try {
        const {email , password}= req.body;

        if(!email || !password){
            return res.json({
                message:"required filed or messing",
                status:false
            });
        };

        const DbDeta = await users.findOne({email})
        if(!DbDeta){
            return res.json({
                message:"user not find!",
                status:false
            })
        };
        const compairePass= await bcryptjs.compare( DbDeta.password ,password );
        if(compairePass){
            return res.json({
                message:"password or email is increact!",
                status:false
            })
        }

        if(!DbDeta.isverify){
          return res.json({
            message:"user not verified please verify user email!",
            status:false
          })  
        };
    const token =await jwt.sign({
        userId:DbDeta._id,
        name:DbDeta.name,
        email:DbDeta.email
    }, process.env.token_secret) 

        res.json({
            message:"login user successfully!",
            status:true,
            token:token
        })


    } catch (error) {
        res.json({
            message:"some thing wronge!",
            status:false,
            error:error.message
        })
    }
 }

 export const isverify = async (req, res)=>{
    try {
        const otps = req.body;
        
        if(!otps){
           return res.json({
                message:"required filed or messing",
                status:false
            })
        };

        const otpData =await otp.findOne({email:req.email}).sort({createdAt:-1})
        
        if(!otpData){
            return res.json({
                message:"Invalid opt!",
                status:false
            })
        };

        if(Date.now() > otpData.expire){
          return  res.json({
                message:"otp expire",
                status:false
            })
        }
        const otpuser= String(otps.otp).trim()
        const otpDb= String(otpData.otp).trim()
        if(otpuser == otpDb){
            const user = await users.findOneAndUpdate({email:req.email},{isverify:true})
            otpData.isused = true;
            await otpData.save();
            const token = await jwt.sign({
                email:user.email,
                userId :user._id

            },process.env.token_secret);
            
           return res.json({
                message:"user verify succesfully!",
                status:true,
                 token:token
            })
        }else{
            res.json({
                message:"otp not match!",
                status:false
            })
        }
    
} catch (error) {
    res.json({
        meeeage:"invalid otp",
        status:false,
        error:error.message,
        token:null
    })
}
 }

 export const resentOtp =async (req , res)=>{
    try {
        const {email} = req.body;
        if(!email){
           return res.json({
                message:"required filed or messing"
            })
        };

    const otps = Math.floor(100000 + Math.random() * 900000);
    const otpobj= {
        email:email,
        otp:otps
    };
    await recentOtp.create(otpobj)
    const temp = await otpEmailTemplate(email , otps)
    const emails= await sendEmail(`${email}`, "verify Email", temp )
    
    const token =await jwt.sign({
        email:email
    }, process.env.token_secret) 
    res.json({
        message:"Verify email !",
        status:true,
        token:token
    })


    } catch (error) {
        res.json({
            message:"server error",
            status:false,
            error:error
        })
    }
 }

 export const recentVerify =async (req , res)=>{
    try {
        const otp = req.body;
        if(!otp){
           return res.json({
                message:"required filed or messing",
                status:false
            })
        };
        const obj={
            email:req.email,
            otp:otp.otp
        }

        const otpData =await recentOtp.findOne(obj).sort({createdAt:-1})
        
        if(!otpData){
            return res.json({
                message:"Invalid opt!",
                status:false
            })
        };

        if(Date.now() > otpData.expire){
          return  res.json({
                message:"otp expire",
                status:false
            })
        }
        const otpuser= String(otp.otp).trim()
        const otpDb= String(otpData.otp).trim()
        if(otpuser == otpDb){
            otpData.isused = true;
            otpData.isverify=true;
            await otpData.save();
        const token =await jwt.sign({
        otp:otpData.otp,
        email:otpData.email,
    }, process.env.token_secret) 
           return res.json({
                message:"user verify succesfully!",
                status:true,
                token:token
            })
        }else{
            res.json({
                message:"otp not match!",
                status:false
            })
        }


    } catch (error) {
        res.json({
        meeeage:"invalid otp",
        status:false,
        error:error.message,
    })
    }
 }

 export const resetPassword =async (req, res)=>{
    try {
        const password =req.body
        if(!password){
            return res.json({
                message:"required filled or messin",
                status:false
            })
        };
        const obj={
            email:req.email,
            otp: req.otp
        }
        const userOtp = await recentOtp.findOne(obj);
        if(!userOtp){
            return res.json({
                message:"user not fond",
                status:false
            });

        };
        const hash =await bcryptjs.hash(String(password.password) ,10)
        if(userOtp.isverify){
            const user =await users.findOne({email:req.email});
            if(!user){
                throw new Error()
            }
            user.password= hash;
            await user.save()

            res.json({
                message:"password change Success fully !",
                status:true
            })
            
        }
    } catch (error) {
        // console.log(error.message)
       res.json({
        message:"server error",
        status:false,
        error:error.message
       }) 
    }
 }