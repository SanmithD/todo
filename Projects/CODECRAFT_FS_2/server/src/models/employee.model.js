import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeName:{
        type: String,
        required: true
    },
    employeeEmail:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    employeePhone:{
        type: String,
        required: true
    },
    employeeBirthday:{
        type: Date,
        default: Date.now(),
        required: true
    },
    employeeDepartment:{
        type: String,
        required: true
    },
    employeeLocation:{
        type: String,
        required: true
    },
},{ timestamps: true });

export const employeeModel = mongoose.model('Employee', employeeSchema);