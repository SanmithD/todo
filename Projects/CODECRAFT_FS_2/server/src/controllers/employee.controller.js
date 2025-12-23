import { employeeModel } from "../models/employee.model.js";
import { Res } from "../utils/res.util.js";

export const createEmployee = async (req, res) => {
  const {
    employeeName,
    employeeEmail,
    employeePhone,
    employeeBirthday,
    employeeDepartment,
    employeeLocation,
  } = req.body;

  if (
    !employeeName ||
    !employeeEmail ||
    !employeePhone ||
    !employeeBirthday ||
    !employeeDepartment ||
    !employeeLocation
  )
    return Res(400, false, "All fields are required", res);
  try {
    const employee = await employeeModel.findOne({employeeEmail});
    if (employee) return Res(400, false, "Employee already exists", res);

    const newEmployee = new employeeModel({
      employeeName,
      employeeEmail,
      employeePhone,
      employeeBirthday,
      employeeDepartment,
      employeeLocation,
    });
    if (!newEmployee) return Res(400, false, "Invalid request", res);
    await newEmployee.save();
    Res(201, true, "Employee details saved", res);
  } catch (error) {
    console.log(error);
    Res(500, false, "Server error", res);
  }
};

export const getAllEmployee = async (req, res) => {
  const user = req.user._id;

  if (!user) return Res(403, false, "Unauthorized", res);
  try {
    const response = await employeeModel.find().sort({ createdAt: -1 });
    if (!response) return Res(404, false, "Not found", res);

    Res(200, true, "All Details", res, response);
  } catch (error) {
    console.log(error);
    Res(500, false, "Server error", res);
  }
};

export const getEmployee = async (req, res) => {
  const user = req.user._id;

  if (!user) return Res(403, false, "Unauthorized", res);
  try {
    const response = await employeeModel.findById(req.params.id);
    if (!response) return Res(404, false, "Not found", res);

    Res(200, true, "Employee detail", res, response);
  } catch (error) {
    console.log(error);
    Res(500, false, "Server error", res);
  }
};

export const deleteDetail = async (req, res) => {
  const user = req.user._id;

  if (!user) return Res(403, false, "Unauthorized", res);
  try {
    const response = await employeeModel.findByIdAndDelete(req.params.id);
    if (!response) return Res(404, false, "Not found", res);

    Res(200, true, "Employee detail deleted", res, response);
  } catch (error) {
    console.log(error);
    Res(500, false, "Server error", res);
  }
};

export const updateDetail = async (req, res) => {
  const user = req.user._id;
  const {
    employeeName,
    employeeEmail,
    employeePhone,
    employeeBirthday,
    employeeDepartment,
    employeeLocation,
  } = req.body;

  if (!user) return Res(403, false, "Unauthorized", res);
  try {
    const response = await employeeModel.findByIdAndUpdate(
      req.params.id,
      {
        employeeName,
        employeeEmail,
        employeePhone,
        employeeBirthday,
        employeeDepartment,
        employeeLocation,
      },
      { new: true }
    );
    if (!response) return Res(404, false, "Invalid request", res);

    Res(200, true, "Employee detail updated", res, response);
  } catch (error) {
    console.log(error);
    Res(500, false, "Server error", res);
  }
};
