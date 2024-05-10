const User = require('../model/userDb')
const sendOTP = require('../services/emailServices')
const appError = require('../utils/appError')
const httpStatusText = require('../utils/httpStatusText')

// Function to generate a random OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
};

const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    try {
        
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const error = appError.create('User not found', 404, httpStatusText.ERROR);
            return next(error);
        }

        // Generate OTP
        const otp = generateOTP();

        // Save OTP to the database
        user.resetPasswordOTP = otp;
        await user.save();

        // Send email with OTP
        await sendOTP(email, otp);

        res.status(200).json({ status: httpStatusText.SUCCESS, message: 'OTP sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: httpStatusText.ERROR, message: 'Failed to send OTP' });
    }
});

module.exports = forgotPassword