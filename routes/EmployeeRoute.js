import express from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
} from "../controllers/Employee.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/employees", getEmployees);
router.get("/employee/:id", getEmployeeById);
router.post("/employee", createEmployee);
router.patch("/employee/:id", updateEmployee);

export default router;
