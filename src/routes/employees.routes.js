import { Router } from "express";
import { getEmployees, getEmployee, createEmployee, patchEmployee, updateEmployee, deleteEmployee } from "../controllers/employees.controller.js";

const router = Router();

router.get("/employees", getEmployees);

router.get("/employees/:id", getEmployee);

router.post("/employees", createEmployee);

router.put("/employees/:id", updateEmployee);

router.patch("/employees/:id", patchEmployee);

router.delete("/employees/:id", deleteEmployee);

export default router;
