import { Queue } from "bullmq";
import redis from "../../../db/client";
import logger from "../../../core/logger";

const monitorQueue = new Queue("monitoring", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});

export const scheduleMonitoring = async (
  targetId: string,
  interval: number
) => {
  await monitorQueue.add(
    "ping",
    { targetId },
    {
      jobId: `monitor-${targetId}`,
      repeat: { every: interval * 60 * 1000 }, // Convert minutes to ms
    }
  );
  logger.info(
    `Scheduled monitoring for target ${targetId} every ${interval} minutes`
  );
};

export default monitorQueue;
