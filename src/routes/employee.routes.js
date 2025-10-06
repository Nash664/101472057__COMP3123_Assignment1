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
// import { auth } from "../middleware/auth.js"; // enable if you want JWT protection

const router = Router();

/**
 * GET /api/v1/emp/employees  -> 200
 */
router.get("/employees", listEmployees);

/**
 * POST /api/v1/emp/employees  -> 201
 */
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

/**
 * GET /api/v1/emp/employees/:eid  -> 200
 */
router.get(
  "/employees/:eid",
  [param("eid").trim().notEmpty().withMessage("eid is required")],
  runValidation,
  getEmployeeById
);

/**
 * PUT /api/v1/emp/employees/:eid  -> 200
 */
router.put(
  "/employees/:eid",
  [param("eid").trim().notEmpty().withMessage("eid is required")],
  runValidation,
  updateEmployee
);

/**
 * DELETE /api/v1/emp/employees?eid=xxx  -> 204
 */
router.delete(
  "/employees",
  [query("eid").trim().notEmpty().withMessage("eid is required")],
  runValidation,
  deleteEmployee
);

export default router;
