import express from "express"
import { isverify, login, signup , resentOtp , recentVerify ,resetPassword } from "../controllers/Auth.js"
import middlleware from "../Middleware/AuthMiddlleware.js"
import resentMiddlleware from "../Middleware/resentOtp.js"
const Authrouter=express.Router()

Authrouter.post("/login" , middlleware, login)
Authrouter.post("/singup" , signup)
Authrouter.post("/verify",middlleware, isverify)


Authrouter.post("/resentOtp", resentOtp)
Authrouter.post("/recentVerify", resentMiddlleware ,recentVerify)
Authrouter.post("/resetPassword" ,resentMiddlleware , resetPassword)



export default Authrouter