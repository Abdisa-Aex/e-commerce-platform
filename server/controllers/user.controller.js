
import jwt from "jsonwebtoken";
import UserModel from "../models/Users.model.js";
import bcryptjs from "bcryptjs";
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../utils/verifyEmailTemplate.js";
import { response } from "express";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";

export const registerUserController = async (req, res) => {
  try {
    let user;
    const { name, email, password } = req.body;
  
    if(!name || !email || !password){
      return res.status(400).json({
        message:"provide email,name,password",
        error:true,
        success:false
      })
    }
    user =await UserModel.findOne({ email:email });
  if(user){
    return res.json({
      message:"User already register with this email",
      error:true,
      success:false
    })
  }
  const verifyCode=Math.floor(100000+Math.random()*900000).toString();
 
  const salt=await bcryptjs.genSalt(10);
  const hashPassword=await bcryptjs.hash(password,salt);


  user= new UserModel({
    email:email,
    password:hashPassword,
    name:name,
    otp:verifyCode,
    otpExpires:Date.now()+600000
  });
   await user.save();
   
//  send verification email
 const verifyEmail=await sendEmailFun({
  sendTo:email,
  subject:"Verify email from Ecommrec App",
  text:"",
  html:VerificationEmail(name,verifyCode)
  
 })

 //create a jwt token for verification purposes
const token =jwt.sign(
  {email:user.email,id:user._id},
  process.env.JSON_WEB_TOKEN_SECRET_KEY
);
return res.status(200).json({
  success:true,
  error:false,
  message:"User registered successfully! Please verify your email",
  token:token,

});
  } catch (error) {
    res.status(500).json({
       message: error.message || error,
      error:true,
      success:false

     });
  }
};



 export async function verifyEmailController(request,response){
  try{
    const {email,otp}=request.body;
    const user = await UserModel.findOne({ email:email });
    if(!user){
      return response.status(400).json({error:true, success:false,message:"user not found" });
    }
    const isCodeValid=user.otp===otp;
    const isNotExpired=user.otpExpires>Date.now();
    if(isCodeValid&&isNotExpired){
      user.isVerified=true;
      user.otp=null;
      user.otpExpires=null;
      await user.save();
      return response.status(200).json({error:false,success:true,message:"Email verified  successfully"});
    } else if(!isCodeValid){
return response.status(400).json({error:true,success:false,message:"Invalid OTP "});
    } else {
      return response.status(400).json({error:true,success:false,message:"OTP  expired"})
    }
  } catch(error){
    return response.status(500).json({
      message:error.message || error,
      error:true,
      success:true
    })
  }
 }


 export async function loginUserController(request,response){
  const {email,password}=request.body;
  const user=await UserModel.findOne({email:email});

  if(!user){
    response.status(400).json({
      message:"User not register",
      error:true,
      success:false
    })
  }

  if(user?.status !== "Active"){
   return response.status(400).json({
      message:"Contact to admin",
      error:true,
      success:false
    })
  }
   
  

  const checkPassword=await bcryptjs.compare(password,user.password);

  if(!checkPassword){
   return response.status(400).json({
      message:"Check your password",
      error:true,
      success:false
       })
    }
    const accesstoken= await generatedAccessToken(user._id)
    const refreshToken= await generatedRefreshToken(user._id)


    const updateUser=await UserModel.findByIdAndUpdate(user?._id,{
      last_login_date:new Date()
    })

    const cookiesOption={
      httpOnly:true,
      secure:true,
      sameSite:"None"
    }
    response.cookie('accessToken',accesstoken,cookiesOption)
    response.cookie('refreshToken',refreshToken,cookiesOption)
 }
 