import {authBari} from "./barear.js"
const decode =()=>{
    const token =authBari() 

    if(!token){
        return null
    }
const jwt = token.split(" ")[1];
const payload =JSON.parse(atob(jwt.split(".")[1])) 
return payload
}
export default decode


