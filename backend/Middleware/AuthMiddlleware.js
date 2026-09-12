import jwt from "jsonwebtoken";

const middlleware =async (req ,res, next)=>{
try {
    const token = req.headers.authorization.split(" ")[1];

    const isverifyed= jwt.verify(token,process.env.token_secret)
    if(isverifyed){
        req.userId = isverifyed.userId;
        req.email =isverifyed.email;
        next()
    } else{
        throw new Error()
    }
} catch (error) {
res.json({
    message:"unAuth user",
    status:false
})    
}    
}


export default middlleware