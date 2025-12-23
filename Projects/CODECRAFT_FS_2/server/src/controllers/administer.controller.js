import bcrypt from 'bcrypt';
import { administerModel } from '../models/administer.model.js';
import { Res } from "../utils/res.util.js";
import { generateToken } from '../utils/token.util.js';

export const signup = async(req, res) =>{
    const { name, email, password } = req.body;

    if(!name || !email || !password) return Res(400, false, "All fields are required");

    try {
        const user = await administerModel.findOne({email});
        if(user) return Res(400, false, 'User already exists', res);

        const hashedPassword = await bcrypt.hash(password, 10);
        if(!hashedPassword) return Res(400, false, 'Invalid request', res);
        const newUser = new administerModel({
            name,
            email,
            password: hashedPassword
        });
        if(!newUser) return Res(400, false, 'Invalid request', res);
        await newUser.save();

        const token = generateToken(newUser._id, res);

        Res(201, true, 'Account created', res,newUser, token);
    } catch (error) {
        console.log(error);
        Res(500, false, 'Server error', res)
    }
}

export const login = async(req, res) =>{
    const { email, password } = req.body;

    if(!email|| !password) return Res(400, false, "All fields are required");

    try {
        const user = await administerModel.findOne({email});
        if(!user) return Res(404, false, 'User does not exists', res);

        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword) return Res(400, false, 'Invalid credentials', res);

        const token = generateToken(user._id, res);

        Res(200, true, 'Logged in', res,user, token);
    } catch (error) {
        console.log(error);
        Res(500, false, 'Server error', res)
    }
}

export const profile = async(req, res) =>{
    const userId = req.user._id;
    if(!userId) return Res(403, false, 'Unauthorized', res);
    try {
        const user = await administerModel.findById(userId).select('-password');
        if(!user) return Res(404, false, 'Not found', res);

        Res(200, true, 'Profile', res, user);
    } catch (error) {
        console.log(error);
        Res(500, false, 'Server error', res);
    }
}

export const deleteAccount = async(req, res) =>{
    const userId = req.user._id;
    if(!userId) return Res(403, false, 'Unauthorized', res);
    try {
        const user = await administerModel.findByIdAndDelete(userId).select('-password');
        if(!user) return Res(404, false, 'Not found', res);

        Res(200, true, 'Profile', res, user);
    } catch (error) {
        console.log(error);
        Res(500, false, 'Server error', res);
    }
}

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    
    Res(200, true, 'Logged out', res);
  } catch (error) {
    Res(500, false, 'Server error', res);
    console.log(error.message);
  }
};
