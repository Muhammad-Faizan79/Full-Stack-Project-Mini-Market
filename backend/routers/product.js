import express from "express";
import { createProduct, getAllProduct, updateProduct , productDelet } from "../controllers/product.js";
import upload from "../Middleware/upload.js";
import middlleware from "../Middleware/AuthMiddlleware.js"
const productrouter = express.Router();

productrouter.post("/create_product" , middlleware ,upload.single("image"),createProduct)
productrouter.get("/get_AllProduct" ,getAllProduct)
productrouter.put("/updateProduct/:id",  middlleware   ,updateProduct)
productrouter.delete("/productDelet/:id", middlleware , productDelet)


export default productrouter