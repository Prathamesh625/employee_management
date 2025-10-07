import { Router } from "express"
import {
    getAllEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee
} from "@controllers/employee.controller";

const employeeRoutes = Router()

employeeRoutes
    .route("/")
    .get(getAllEmployees)
    .post(createEmployee);

employeeRoutes
    .route("/:id")
    .get(getEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee);

export default employeeRoutes