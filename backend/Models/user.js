import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    isverify:{
        type:Boolean,
        default:false
    },
    password:{
        type:String
    }
},{timestamps:true})

const users =mongoose.model("users", userSchema);

export default users