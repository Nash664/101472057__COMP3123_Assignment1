import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// health
app.get("/", (_req, res) => res.json({ ok: true, service: "COMP3123 Assignment 1 API" }));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes);

// global 404
app.use((req, res) => {
  res.status(404).json({ status: false, message: "Route not found" });
});

// global error handler (fallback)
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ status: false, message: "Internal Server Error" });
});

export default app;
