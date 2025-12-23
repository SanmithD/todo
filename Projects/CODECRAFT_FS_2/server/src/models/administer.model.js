import mongoose from "mongoose";

const administerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }
},{ timestamps: true });

export const administerModel = mongoose.model('Administer',administerSchema);