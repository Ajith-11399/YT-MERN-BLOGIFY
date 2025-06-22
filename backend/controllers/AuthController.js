import handleError from "../helpers/handleError.js";
import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Register = async ( req, res, next )=> {

    try {

        // It Pulls the submitted values from the HTTP request body
        const { name, email, password } = req.body;
        // Checking if the user is already exist
        const checkUser = await User.findOne({ email });

        if(checkUser){
            return next(handleError(409, 'User already registered!!'));
        };

        const hashedPassword = bcryptjs.hashSync(password);

        const user = new User({
            name, email, password: hashedPassword
        });

        await user.save();

        res.status(200).json({success: true, message: 'Registration Successful!'});
        
    } catch (error) {
        return next(handleError(500, error.message));
    }

}

const Login = async ( req, res, next )=> {
    
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return next(handleError(404, 'User not found!'));
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return next(handleError(401, "Login password is not correct!"));
        };

        const token = jwt.sign({
            _id: user._id,
            name : user.name,
            email: user.email,
            avatar: user.avatar,
        }, process.env.JWT_SECRET);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        });

        const newUser = user.toObject({ getters: true });
        delete newUser.password;
        res.status(201).json({success: true, user: newUser, message: 'Login Successful!'});

    } catch (error) {
        return next(handleError(500, error.message))
    }

}

const googleLogin = async ( req, res, next )=> {
    
    try {

        const { name, email, avatar } = req.body;

        let user
        user = await User.findOne({ email });
        if(!user){
            const password = Math.random().toString();
            const hashedPassword = bcryptjs.hashSync(password);
            const newUser = new User({
                name, email, password: hashedPassword, avatar
            });
            user = await newUser.save();
        };

        const token = jwt.sign({
            _id: user._id,
            name : user.name,
            email: user.email,
            avatar: user.avatar,
        }, process.env.JWT_SECRET);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        });

        const newUser = user.toObject({ getters: true });
        delete newUser.password;
        res.status(200).json({success: true, user: newUser, message: 'Login Successful!'});

    } catch (error) {
        return next(handleError(500, error.message))
    }

}

const logOut = async (req, res, next)=> {
    try {
        
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        });

        res.status(200).json({
            success: true,
            message: 'Logout Successful!'
        });

    } catch (error) {
        next(handleError(500, error.message));
    }
}

export { Register, Login, googleLogin, logOut };