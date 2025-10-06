import { validationResult } from "express-validator";

export const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: "Validation error",
      errors: errors.array().map(e => ({ field: e.param, msg: e.msg }))
    });
  }
  next();
};
