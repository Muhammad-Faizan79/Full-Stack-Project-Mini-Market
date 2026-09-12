import { tokenrer ,authBari } from "./barear.js"
import baseUrl from "./baseUrl.js"

const singup = async ()=>{
    const fullName = document.querySelector("#fullName").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    if(!fullName || !email || !password){
        return alert("required filled or messing")
    }
    const obj = {
       name :fullName,
        email,
        password
    }

    const data = await fetch(`${baseUrl}/singup`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    }).then(data=> data.json())
    .catch(error=>{
        alert(error)
    })
    alert(data.message)
    if(data.status){
        localStorage.setItem("token", data.token)
        location.replace("verify.html")
    }
}

const verify =async ()=>{
    const otp = document.querySelector("#otp").value;
    const token =  authBari()
     if(!otp || !token){
        alert("required filed or messingggg")
     };
     const obj={
        otp:`${otp}`
     }

     const data = await fetch(`${baseUrl}/verify`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": token
        },
        body:JSON.stringify(obj)
     }).then(data=> data.json())
     .catch(error=>{console.log(error)})
     if(data.status){
        alert(data.message)
        location.replace("login.html")
     }else{
        alert(data.message)
    }
}


const login = async ()=>{
    try {
        const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
        const token =  authBari()
    if(!email || !password ){
        return alert("required filled or messing")
    }
    const obj = {
        email,
        password
    }

    const data = await fetch(`${baseUrl}/login`,{
        method:"POST",
        headers:{
            "Authorization":token,
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    }).then(data=> data.json())
    
    alert(data.message)
    if(data.status){
        localStorage.setItem("AUTHtoken", data.token)
    alert(data.message)
    location.replace("dashboard.html")
    
    }
    } catch (error) {
     alert(error.message)   
    }
}

const verifyEmail =async ()=>{
    try {
        const email = document.querySelector("#email").value
    if(!email ){
        return alert("required filled or messing")
    }

    const obj = {
        email
    }

    const data = await fetch(`${baseUrl}/resentOtp`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
    },
    body:JSON.stringify(obj)
}).then(data=>data.json()) 
    if(data.status){
        alert(data.message)
        localStorage.setItem("token", data.token)
        location.replace("verifyOtp.html")

    }else{
        alert(data)
    }
    } catch (error) {
        alert("server error")
    }
}

window.verifyEmail = verifyEmail
window.login =login
window.verify =verify
window.singup =singup