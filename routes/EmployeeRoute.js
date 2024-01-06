import express from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  getEmployeeCriteriaByEmployeeId,
  updateEmployeeCriteria,
  getEmployeesName,
} from "../controllers/Employee.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/employees", getEmployees);
router.get("/employee/:id", getEmployeeById);
router.post("/employee", createEmployee);
router.patch("/employee/:id", updateEmployee);
router.patch("/employee/criteria/:employeeId", updateEmployeeCriteria);
router.get("/employee/criteria/:employeeId", getEmployeeCriteriaByEmployeeId);
router.get("/employees/name", getEmployeesName);

export default router;
