import { Sequelize } from "sequelize";
import logger from "../core/logger";

const sequelize = new Sequelize(process.env.DB_URL!, {
  dialect: "postgres",
  logging: (msg) => logger.debug(msg),
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info("Database connected and synced");
  } catch (error) {
    logger.error("Database connection error:", error);
    process.exit(1);
  }
};

export default sequelize;
