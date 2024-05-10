const User = require('../model/userDb')
const appError =require('../utils/appError')
const httpStatusText = require('../utils/')

const resetPassword = asyncHandler(async (req, res, next) => {
    const { email, otp, newPassword } = req.body;

    try {
        
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const error = appError.create('User not found', 404, httpStatusText.ERROR);
            return next(error);
        }

        // Check if OTP is correct
        if (user.resetPasswordOTP !== otp) {
            const error = appError.create('Invalid OTP', 400, httpStatusText.ERROR);
            return next(error);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        user.password = hashedPassword;
        user.resetPasswordOTP = null; // Clear OTP
        await user.save();

        res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: httpStatusText.ERROR, message: 'Failed to reset password' });
    }
});

module.exports = resetPassword