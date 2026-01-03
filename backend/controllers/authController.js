const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const Users=require("../models/user");
const log = require("../utils/logger");
// register user
const registerUser=async(req,res)=>{
    try {
        
        const {name,email,password}=req.body;
        if(!name || !email || !password)
        {
            return res.status(400).json({ message: "All fields required" });
        }
        // check for existed user
        const UserExist=await Users.findOne({email});
        if(UserExist)
            return res.status(400).json({ message: "User already exists" });

        // hashing of password
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await Users.create({
            name,email,password:hashedPassword
        })
        res.status(201).json({ message: "User registered successfully" });
        log(`User registered: ${email}`);

    } catch (error) {
        
        res.status(500).json({message:error.message});
    }
}

// login user
const login=async(req,res)=>{
    try {        
        const {email,password}=req.body;
        const user=await Users.findOne({email});
        if(!user)
            res.status(400).json({message:"User is not Found"});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
            return res.status(400).json({message:"Invalid credentials"});

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"8h"

        });
        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
        log(`User logged in: ${email}`);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports={
    registerUser,
    login
}