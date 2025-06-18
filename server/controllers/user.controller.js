import User from "../models/user.model.js"
import AppError from "../utils/error.utils.js"
import fs from "fs/promises"
import cloudinary from "cloudinary"





const cookieOption = {
    maxAge: 7*24*60*60*1000, //    7 days
    httpOnly:true,
    secure:true
}

const register = async (req,res,next) => {
    const {fullName, email, password} = req.body;

    if(!fullName || !email || !password) {
        return next(new AppError('All fields are required',400))
    }

    const userExists = await User.findOne({email});

    if(userExists){
        return next(new AppError('Email already exists',400))
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:"https://res.cloudinary.com/ditwd6uzx/image/upload/v1737211073/lms/bedz3jib5shj5abzaff8.jpg"
        }
    });

    if(!user){
        return next(new AppError('User registration Failed, please try again',500))
    }

    // if (req.file) {
    //     console.log("nottttttee",req.file)
    // }

    if(req.file){
        
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'FlexFit',
                width:250,          // crop image
                height:250,
                gravity:'faces',
                crop:'fill'
            })
            console.log("result >> ",result)

            if(result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                //remove file from local / server

                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (e) {
            new AppError(e || 'File not uploaded, please try again', 500)
        }
    }

    await user.save();
    user.password = undefined;
    const token = await user.generateJWTToken();
    res.cookie('token',token,cookieOption);

    res.status(201).json({
        success:true,
        message:'User registered successfully',
        user
    })

}
const login = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return next(new AppError('Please provide email and password',400))
        }

        const user = await User.findOne({
            email
        }).select('+password')

        if(!user || !(await user.comparePassword(password))){
            return next(new AppError('Invalid email or password',401))
        }

        const token = await user.generateJWTToken();
        user.password = undefined;
        res.cookie('token',token,cookieOption);
        res.status(200).json({
            success:true,
            message:'User logged in successfully',
            user
        })
        

    } catch (e) {
        next(new AppError(e.message,500))
        
     }
}

const logout = async (req,res) => {
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:'User logged out successfully'
    })
}

const getProfile = async (req,res,next) => {
    try {
        
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return next(new AppError("User not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user,
        });
    } catch (error) {
        next(new AppError(error.message || "Something went wrong", 500));
    }
}

const updateUser = async (req,res,next) => {
    const {fullName} = req.body;
    const id = req.user.id;

    const user = await User.findById(id);

    if(!user) {
        return next(
            new AppError("User not found", 400)
        )
    }

    if(fullName){
        user.fullName = fullName;
    }

    if(req.file){
        if (user.avatar?.public_id) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        }
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'CodeCraft',
                width:250,          // crop image
                height:250,
                gravity:'faces',
                crop:'fill'
            })
            console.log("result >> ",result)

            if(result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                //remove file from local / server

                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (e) {
            new AppError(e || 'File not uploaded, please try again', 500)
        }
    }
    await user.save();

    const updatedUser = await User.findById(id);
    res.status(200).json({
        status: 'success',
        message:"User details updated successfully",
        user: updatedUser,
    })

}

export {
    register,
    login,
    logout,
    getProfile,
    updateUser
}