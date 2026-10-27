const shell = (title, intro, otp) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${title}</title>
</head>
<body style="font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f4f4f4;color:#333;">
  <div style="max-width:600px;margin:20px auto;background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
    <div style="text-align:center;border-bottom:1px solid #eee;padding-bottom:10px;margin-bottom:20px;">
      <h1 style="color:#4CAF50;">${title}</h1>
    </div>
    <div style="text-align:center;">
      <p style="font-size:16px;line-height:1.5;">${intro}</p>
      <div style="font-size:28px;font-weight:bold;letter-spacing:6px;color:#4CAF50;margin:20px 0;">${otp}</div>
      <p style="font-size:14px;color:#777;">This code expires in 10 minutes. If you did not request it, you can safely ignore this email.</p>
    </div>
    <div style="text-align:center;font-size:14px;color:#777;margin-top:20px;">
      <p>&copy; ${new Date().getFullYear()} Spices Gold. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

const VerificationEmail = (username, otp) =>
  shell(
    "Verify Your Email Address",
    `Hi ${username}, thank you for registering with Spices Gold. Please use the code below to verify your email address:`,
    otp
  );

export const ResetPasswordEmail = (username, otp) =>
  shell(
    "Reset Your Password",
    `Hi ${username}, use the code below to reset your Spices Gold password:`,
    otp
  );

export default VerificationEmail;
