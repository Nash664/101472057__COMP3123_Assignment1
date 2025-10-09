import { Router } from "express";
import { body, param, query } from "express-validator";
import {
  listEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from "../controllers/employee.controller.js";
import { runValidation } from "../middleware/validate.js";

const router = Router();

router.get("/employees", listEmployees);


router.post(
  "/employees",
  [
    body("first_name").trim().notEmpty(),
    body("last_name").trim().notEmpty(),
    body("email").isEmail().withMessage("valid email required"),
    body("position").trim().notEmpty(),
    body("salary").isNumeric().withMessage("salary must be number"),
    body("date_of_joining").isISO8601().withMessage("date_of_joining must be ISO date"),
    body("department").trim().notEmpty()
  ],
  runValidation,
  createEmployee
);

router.get(
  "/employees/:eid",
  [param("eid").trim().notEmpty().withMessage("eid is required")],
  runValidation,
  getEmployeeById
);

router.put(
  "/employees/:eid",
  [param("eid").trim().notEmpty().withMessage("eid is required")],
  runValidation,
  updateEmployee
);


router.delete(
  "/employees",
  [query("eid").trim().notEmpty().withMessage("eid is required")],
  runValidation,
  deleteEmployee
);

export default router;
