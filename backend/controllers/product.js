
import product from "../Models/product.js";
import cloudinary from "../config/Cloudinarry.js"

export const createProduct= async (req , res)=>{
    try {
        
    const {title, des ,price,catogery, condition,location}= req.body;

    if(!title || !des || !price || !condition || !location){
        return res.json({
            message:"required filed or messing",
            status:false
        })
    };

    if(!req.file){
        return res.json({
            message:"required filed or messing",
            status:false
        })
    }
    const result =await new Promise((resolve , reject)=>{
        const stream = cloudinary.uploader.upload_stream(
            {
                folder:"product"
            },
            (error, result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            }
        );
        stream.end(req.file.buffer);
    })
    const productobj={
        userId:req.userId,
        email:req.email,
        title:title,
        des:des,
        price:price,
        catogery:catogery,
        condition:condition,
        location:location,
        UrlImage:result.secure_url
    }
    const Data = await product.create(productobj)

    return res.json({
        message:"Product Created!",
        status:true
    })
    
    } catch (error) {
        console.log(error)
        return res.json({
        message:"Product not Created!",
        status:false,
        error:error
    })
    }


}

export const getAllProduct = async (req , res)=>{
    try {
        const{ userId }= req.query
       let produts;
       if(userId){
        produts = await product.find({userId})
        
       }else{
        produts = await product.find()
       }
        res.json({
            message:"Prodect get all",
            status:true,
            products:produts
        })
        
        
    } catch (error) {
        res.json({
            message:"not error" ,
            status:false,
            error:error.message,
            products:null
        })
    }
}

export const updateProduct = async (req , res)=>{
    try {
        const productupdate = await product.findByIdAndUpdate(req.params.id, req.body)
        if(!productupdate){
            return res.json({
            message:"product not found",
            status:false,
            productupdate
                    })
        }

        res.json({
            message:"product updated",
            status:true,
            productupdate
           })
        
    } catch (error) {
        res.json({
            message:"error server down",
            error:error.message,
            status:false
           })
    }
}

export const productDelet = async (req , res)=>{
    try {
        const deleteproduct = await product.findByIdAndDelete(req.params.id);

        if(!deleteproduct){
            res.json({
                message:"product not found",
                status:false
            })
        }

        res.json({
            message:"product deleted!",
            status:true
        })
    } catch (error) {
    res.json({
                message:"server down",
                status:false,
                error:error.message
            })       
    }
}