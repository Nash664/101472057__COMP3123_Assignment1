import { Router } from "express";
import { body } from "express-validator";
import { signup, login } from "../controllers/user.controller.js";
import { runValidation } from "../middleware/validate.js";

const router = Router();

/**
 * POST /api/v1/user/signup  -> 201
 */
router.post(
  "/signup",
  [
    body("username").trim().notEmpty().withMessage("username is required"),
    body("email").isEmail().withMessage("valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("password min 6 chars")
  ],
  runValidation,
  signup
);

/**
 * POST /api/v1/user/login  -> 200
 * Accepts either {email, password} OR {username, password}
 */
router.post(
  "/login",
  [
    body("password").notEmpty().withMessage("password is required"),
    body().custom((value) => {
      if (!value.email && !value.username) {
        throw new Error("email or username is required");
      }
      return true;
    })
  ],
  runValidation,
  login
);

export default router;
