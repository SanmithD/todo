import express from 'express';
import { createEmployee, deleteDetail, getAllEmployee, getEmployee, updateDetail } from '../controllers/employee.controller.js';
import { isAuthorized } from '../middlewares/administer.middleware.js';

const employeeRouter = express.Router();

employeeRouter.post('/create', createEmployee);
employeeRouter.put('/update/:id',isAuthorized, updateDetail);
employeeRouter.get('/getAll',isAuthorized, getAllEmployee);
employeeRouter.get('/get/:id', isAuthorized, getEmployee);
employeeRouter.delete('/delete/:id', isAuthorized, deleteDetail);

export default employeeRouter;