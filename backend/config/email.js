import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.user_email,
        pass:process.env.email_app_pass
    }
});

export default transporter