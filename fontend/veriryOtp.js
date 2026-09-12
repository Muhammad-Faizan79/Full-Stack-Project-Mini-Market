import baseUrl from "./baseUrl.js";
import {tokenrer} from "./barear.js"
import payload from "./tokendecode.js"
const h1 = document.querySelector(".email")
const inputs = document.querySelectorAll(".otp-input")

h1.innerHTML= payload.email

inputs.forEach((input , index)=>{
    // key ko aga lakar jana ka lia 
    
    input.addEventListener("input", ()=>{
        if(input.value.length === 1  && index <inputs.length -1){
            inputs[index + 1].focus();
        }
    });
    
    // or key ko picha lakar jana ka lia
    
    input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {

      // Agar current input empty hai
      if (input.value === "" && index > 0) {
        inputs[index - 1].focus();
        inputs[index - 1].value = "";
      }
    }
  });

 });


const verifyOtp = async ()=>{
    try {
        console.log("hello user")
        let otp ="";
        const token = tokenrer()

        inputs.forEach((input)=>{
            otp += input.value;
        });
        if(otp.length < 6 ){
            return("required filld or messing")
        };
        if(!token){
            alert("unAuth user")
        }

        const responce = await fetch(`${baseUrl}/recentVerify`, {
            method:"POST",
            headers:{
                "Authorization":token,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({otp})
        }).then(responce=>responce.json())
    if(responce.status){
        alert(responce.message);
        localStorage.setItem("token", responce.token)
        location.replace("changePassword.html")
    }
        
    } catch (error) {
        console.log(error)
    }
}


window.verifyOtp =verifyOtp