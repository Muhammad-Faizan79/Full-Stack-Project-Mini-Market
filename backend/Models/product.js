import mongoose from "mongoose";

const productShema = mongoose.Schema({
    userId:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    UrlImage:{
        type:String
    },
    title:{
        type:String
    },
    des:{
        type:String
    },
    price:{
        type:Number
    },
    catogery:{
        type:String,
    },
    condition:{
        type:String
    },
    location:{
        type:String
    }
})

const product = mongoose.model("products" , productShema )

export default product