import transporter from "../config/email.js";

const sendEmail =async (to, subject , html)=>{
    try {
        const email = await transporter.sendMail({
            from:process.env.user_email,
            to:to,
            subject:subject,
            html:html
        });
        
        return console.log("email send successfully");

        
    } catch (error) {
        console.log("false",error.message)
        
    }
}

export default sendEmail