import { tokenrer } from "./barear.js";
import baseUrl from "./baseUrl.js";


const chengePassword =async ()=>{
    try {
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if(!newPassword || !confirmPassword){
            return alert("required filed or messing");
        };

        if(newPassword !== confirmPassword){
            return alert("password do not match!")

        };

        const responce = await fetch(`${baseUrl}/resetPassword`,{
            method:"POST",
            headers:{
                "Authorization":tokenrer(),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({newPassword})
        }).then(responce=>responce.json())
        if(responce.status){
            localStorage.removeItem("token")
            alert(responce.message);
            location.replace("login.html")
        }else{
            alert(responce.message)
        }
    } catch (error) {
        console.log(error)
    }
}



window.chengePassword =chengePassword