import jwt from "jsonwebtoken";

const resentMiddlleware =async (req ,res, next)=>{
try {
    const token = req.headers.authorization.split(" ")[1];

    const isverifyed= jwt.verify(token,process.env.token_secret)
    if(isverifyed){
        req.email =isverifyed.email;
        req.otp = isverifyed.otp;
        next()
    } else{
        throw new Error()
    }
} catch (error) {
res.json({
    message:"unAuth user",
    status:false,
    error:error
})    
}    
}


export default resentMiddlleware