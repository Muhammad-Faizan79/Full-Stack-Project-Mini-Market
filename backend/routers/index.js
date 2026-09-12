import express  from "express";
import Authrouter from "./Auth.js";
import productrouter from "./product.js";

const routers =express.Router();

routers.use("/api" , Authrouter)
routers.use("/api", productrouter)


export default routers