import {Seller} from '../models/Seller.model.js';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail,sendWelcomeEmail ,sendPasswordResetEmail,sendResetSuccessEmail} from '../nodemailer/emails.js';

export const signup=async(req,res)=>{
    const {name,email,phone,address,state,pincode,password}=req.body;

    try{
        if(!email||!password||!name){
            throw new Error("All fields are requires");
        }
        const userAlreadyExists = await Seller.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({success:false,message:"user already exists"});
        }
        const hashPassword=await bcryptjs.hash(password,10);
        const verificationToken=Math.floor(100000 + Math.random() * 900000).toString();

        const seller=new Seller({
            name,
            email,
            phone,
            address,
            state,
            pincode,
            password:hashPassword,
            verificationToken,
            verificationExpires: Date.now()+24*60*60*1000
        })
        await seller.save();


        generateTokenAndSetCookie(res,seller._id);


        await sendVerificationEmail (seller.email,verificationToken);
        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                ...seller._doc,
                password: undefined
            },
        });

    }catch(error){
        res.status(400).json({success:false,message:error.message});
    }

};

export const verifyEmail= async(req,res)=>{
    const{code}=req.body;

    try{
        const seller=await Seller.findOne({
            verificationToken:code,
            verificationExpires:{$gt:Date.now()}
        })

        if(!seller){
            return res.status(400).json({success:false,message:"Invalid or expired verification code"})
        }

        seller.isverified=true;
        seller.verificationToken=undefined;
        await seller.save();

        await sendWelcomeEmail(seller.email,seller.name);

        res.status(200).json({
            success: true,
            message:"email verified successfully",
            user:{
                ...seller._doc,
                password:undefined,
            },
        })
    }
    catch(error){
        console.log("error in verifyEmail",error)
        res.status(500).json({success:false,message:"Server error"});

    }
}
export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const seller=await Seller.findOne({email});
        if(!seller){
            return res.status(400).json({success:false,message:"invalid credentials"});
        }
        const isPasswordValid=await bcryptjs.compare(password,seller.password);
        if(!isPasswordValid){
            return res.status(400).json({success:false,message:"invalid credentials"});
        }

        generateTokenAndSetCookie(res,seller._id);

        seller.lastLogin=new Date();
        await seller.save();

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                ...seller._doc,
                password: undefined
            },
        });

    }
    catch(error){
        console.log("Error in login",error);
    res.status(400).json({success:false,message:error.message});
    }
}   
export const logout=async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({success:true,message:"logged out successfully"});
}


export const forgotPassword=async(req,res)=>{
    const {email}=req.body;
    try{

        const seller=await Seller.findOne({email});
        if(!seller){
            return res.status(400).json({success:false,message:"user not found"});
        }

        const resetToken =crypto.randomBytes(20).toString("hex");
        const resetTokenExpireAt=Date.now()+1*60*60*1000;

        seller.resetPasswordToken=resetToken;
        seller.resetPasswordExpires=resetTokenExpireAt;

        await seller.save();

        await sendPasswordResetEmail(seller.email,`${process.env.URL}/reset-password/${resetToken}`);
       res.status(200).json({success:true,message:"Password reset link sent to your email"});

    }catch(error){
        console.error(`Error in forgotPassword`,error);
       res.status(400).json({success:false,message:error.message});
    }
}



export const resetPassword=async(req,res)=>{
    try{
        const {token}=req.params;
        const {password}=req.body;
        const seller=await Seller.findOne({
            resetPasswordToken:token,
            resetPasswordExpires:{$gt:Date.now()},
        });
        if(!seller){
            return res.status(400).json({success:false,message:"Invalid or expired reset token"});
        }


        const hashedPassword=await bcryptjs.hash(password,10);

        seller.password=hashedPassword;
        seller.resetPasswordToken=undefined;
        seller.resetPasswordExpires=undefined;

        await seller.save();

        await sendResetSuccessEmail(seller.email);
       res.status(200).json({success:true,message:"Password reset successful"});

    }catch(error){
        console.error(`Error in resetpassword`,error);
       res.status(400).json({success:false,message:error.message});
    }
}

export const checkAuth=async (req,res)=>{
    try{
        const seller=await Seller.findById(req.sellerId).select("-password");
        if(!seller){
           return res.status(400).json({success:false,message:"user not found"});
        }
         res.status(200).json({success:true,user:seller});
    }
    catch(error){
        console.error(`Error in checkAuth`,error);
       res.status(400).json({success:false,message:error.message});

    }
}



