import mongoose, { mongo } from "mongoose";

const reotpSchema = mongoose.Schema({
    email:{
        type:String,

    },
    otp:{
        type:Number
    },
    expire:{
        type:Date,
        default:new Date( Date.now()+(10 *60 *1000) )
    },
    isused:{
        type:Boolean,
        default: false
    },
    isverify:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


const recentOtp = mongoose.model("resentOtp", reotpSchema)

export default  recentOtp