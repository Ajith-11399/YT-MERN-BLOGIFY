import cloudinary from "../config/cloudinary.js";
import handleError from "../helpers/handleError.js";
import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';

const getUser = async ( req, res, next ) => {
    try {

        const { userid } = req.params;
        const user = await User.findOne({_id: userid}).lean().exec();

        if(!user){
            next(handleError(404, 'User not found!'));
        };

        res.status(200).json({success: true, message: 'User data found!', user});

    } catch (error) {
        next(handleError(500, error.message));
    }
}

const updateUser = async ( req, res, next ) => {
    try {
        
        const data = JSON.parse(req.body.data);
        const { userid } = req.params;

        const user = await User.findById(userid);
        user.name = data.name
        user.email = data.email
        user.bio = data.bio

        if( data.password && data.password.length >= 8 ){
            const hashedPassword = bcryptjs.hashSync(data.password);
            user.password = hashedPassword;
        }

        if(req.file){
            const uploadResult = await cloudinary.uploader
            .upload(req.file.path,
                {folder: 'blogify', resource_type: 'auto'}
            )
            .catch((error)=>{
                next(handleError(500, error.message));
            });

            user.avatar = uploadResult.secure_url
        }

        await user.save();

        const newUser = user.toObject({getters: true});
        delete newUser.password

        res.status(200).json({ success: true, message: 'Data is updated!', user: newUser });
    
    } catch (error) {
        next(handleError(500, error.message));
    }
}

const getAllUser = async(req, res, next) => {
    try {
        const user = await User.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(handleError(500, error.message));
    }
}

const deleteUser = async(req, res, next) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'User has been deleted!' });
    } catch (error) {
        next(handleError(500, error.message));
    }
}

export { getUser, updateUser, getAllUser, deleteUser }; 