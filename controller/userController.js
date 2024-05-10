const User = require('../model/userDb')
const asyncHandler = require('express-async-handler')
const appError = require('../utils/appError')
const httpStatusText = require('../utils/httpStatusText')

const register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const oldUser = await User.findOne({ where: { email } });
        if (oldUser) {
            const error = appError.create('User already exists', 400, httpStatusText.FAIL);
            return next(error);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = await generateJWT({ email: newUser.email, id: newUser._id});
        newUser.token = token;

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: httpStatusText.ERROR, message: 'Failed to register user' });
    }
});


const login = asyncWrapper(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email && !password) {
        const error = appError.create('email and password are required', 400, httpStatusText.FAIL)
        return next(error);
    }

    const user = await User.findOne({ where: { email } });

    if(!user) {
        const error = appError.create('user not found', 400, httpStatusText.FAIL)
        return next(error);
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if(user && matchedPassword) {
        // logged in successfully

       const token = await generateJWT({email: user.email, id: user._id});

        return res.json({ status: httpStatusText.SUCCESS, data: {token}});
    } else {
        const error = appError.create('something wrong', 500, httpStatusText.ERROR)
        return next(error);
    }

})


module.exports = {
    register,
    login
    };