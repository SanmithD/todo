import Joi from "joi";
import jwt from "jsonwebtoken";
import { administerModel } from "../models/administer.model.js";
import { Res } from "../utils/res.util.js";

export const signupMiddleware = (req, res, next) => {
  const signup = Joi.object({
    name: Joi.string()
      .pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
      .required()
      .messages({
        "string.pattern.base": "Only letters and single spaces are allowed",
        "string.empty": "Name is required",
      }),
    email: Joi.string()
      .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .required()
      .messages({
        "string.pattern.base": "Enter a valid email address",
        "string.empty": "Email is required",
      }),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,15}$/)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.pattern.base":
          "Password must be 5–15 characters long and include at least one letter and one number",
      }),
  });

  const { error } = signup.validate(req.body);
  if (error) {
    return Res(400, false, error.details[0].message, res);
  }

  next();
};

export const loginMiddleware = (req, res, next) => {
  const login = Joi.object({
    email: Joi.string()
      .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .required()
      .messages({
        "string.pattern.base": "Enter a valid email address",
        "string.empty": "Email is required",
      }),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,15}$/)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.pattern.base":
          "Password must be 5–15 characters long and include at least one letter and one number",
      }),
  });

  const { error } = login.validate(req.body);
  if (error) {
    return Res(400, false, error.details[0].message, res);
  }

  next();
};

export const isAuthorized = async(req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token) return Res(400, false, 'Invalid token',res);

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode) return Res(403, false, 'Unauthorized',res);

        const user = await administerModel.findById(decode.userId).select('-password');
        req.user = user;

        next();
    } catch (error) {
        Res(500, false, 'Server error',res);
        console.log(error);
    }
}
