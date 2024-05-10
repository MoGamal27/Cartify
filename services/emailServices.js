require('dotenv').config()
const nodemailer = require('nodemailer')

const sendOTP = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendOTP 