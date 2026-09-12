import mongoose, { mongo } from "mongoose";

const otpSchema = mongoose.Schema({
    userId:{
        type:String
    }, 
    email:{
        type:String,

    },
    otp:{
        type:Number
    },
    expire:{
        type:Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000)
    },
    isused:{
        type:Boolean,
        default: false
    }
},{timestamps:true})


const otp = mongoose.model("UserOtp", otpSchema)

export default otp