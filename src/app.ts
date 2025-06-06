import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import { authenticateJWT } from "./modules/auth/strategies/jwt";
import authRouter from "./modules/auth/auth.router";
import targetsRouter from "./modules/targets/targets.router";
import { sendError } from "./core/apiResponse";
import { APIError } from "./core/errors";
import logger from "./core/logger";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  morgan("combined", { stream: { write: (msg) => logger.http(msg.trim()) } })
);

// Swagger
const swaggerDocument = YAML.load(path.join(__dirname, "../docs/swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/targets", authenticateJWT, targetsRouter);

// Health check
app.get("/health", (req, res) => res.status(200).send("OK"));

// 404 handler
app.use((req, res, next) => {
  next(new APIError(404, "Route not found"));
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("Error:", err);
  sendError(res, err);
});

export default app;
