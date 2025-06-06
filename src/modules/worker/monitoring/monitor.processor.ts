import { Worker } from "bullmq";
import axios from "axios";
import redis from "../../../db/client";
import StatusCheck from "../../../db/models/StatusCheck";
import logger from "../../../core/logger";

const worker = new Worker(
  "monitoring",
  async (job) => {
    const { targetId } = job.data;
    const startTime = Date.now();

    try {
      const target = await Target.findByPk(targetId);
      if (!target || !target.isActive) {
        logger.warn(`Target ${targetId} not found or inactive, skipping check`);
        return;
      }

      const response = await axios.get(target.url, {
        timeout: target.timeout * 1000 || 10000,
      });

      await StatusCheck.create({
        targetId,
        statusCode: response.status,
        responseTime: Date.now() - startTime,
        isUp: true,
      });

      logger.info(`Successfully monitored ${target.url}`);
    } catch (error) {
      await StatusCheck.create({
        targetId,
        isUp: false,
        errorMessage: error.message,
      });

      logger.error(`Monitoring failed for target ${targetId}:`, error.message);
      throw error;
    }
  },
  { connection: redis }
);

worker.on("completed", (job) => {
  logger.debug(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  logger.error(`Job ${job?.id} failed:`, err.message);
});

export default worker;
