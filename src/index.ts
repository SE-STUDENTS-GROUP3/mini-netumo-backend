import app from "./app";
import { connectDB } from "./db/client";
import logger from "./core/logger";
import "./modules/worker/monitoring/monitor.processor";
import "./modules/worker/expiry/expiry.processor";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  logger.error("Failed to start server:", err);
  process.exit(1);
});
