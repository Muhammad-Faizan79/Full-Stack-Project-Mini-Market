const otpEmailTemplate = (name, otp) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>

    <style>
        body {
            margin: 0;
            padding: 0;
            background: #f4f6f8;
            font-family: Arial, sans-serif;
        }

        .container {
            max-width: 500px;
            margin: 40px auto;
            background: #ffffff;
            padding: 35px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 20px;
        }

        h1 {
            color: #222222;
            margin-bottom: 10px;
        }

        p {
            color: #666666;
            font-size: 15px;
            line-height: 1.6;
        }

        .otp {
            display: inline-block;
            margin: 25px 0;
            padding: 15px 30px;
            background: #f1f5ff;
            color: #2563eb;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            border-radius: 8px;
        }

        .warning {
            font-size: 13px;
            color: #999999;
            margin-top: 20px;
        }

        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
            font-size: 12px;
            color: #999999;
        }
    </style>
</head>

<body>

    <div class="container">

        <div class="logo">
            Faizan_ERP.LTD
        </div>

        <h1>Hello ${name} 👋</h1>

        <p>
            Thank you for signing up with Faizan_ERP.LTD.
            Please use the OTP below to verify your email address.
        </p>

        <div class="otp">
            ${otp}
        </div>

        <p>
            This OTP will expire in <strong>10 minutes</strong>.
        </p>

        <p class="warning">
            If you did not request this code, please ignore this email.
            Do not share this OTP with anyone.
        </p>

        <div class="footer">
            © 2026 Faizan_ERP.LTD . All rights reserved.
        </div>

    </div>

</body>
</html>
    `;
};


export default otpEmailTemplate