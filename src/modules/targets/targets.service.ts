import { Op } from "sequelize";
import Target from "../../db/models/Target";
import StatusCheck from "../../db/models/StatusCheck";
import { APIError } from "../../core/errors";
import logger from "../../core/logger";

class TargetsService {
  async createTarget(userId: string, data: any) {
    try {
      const target = await Target.create({ userId, ...data });
      return target;
    } catch (error) {
      logger.error("Error creating target:", error);
      throw new APIError(400, "Failed to create target");
    }
  }

  async getTargets(userId: string) {
    return Target.findAll({
      where: { userId },
      include: [
        {
          model: StatusCheck,
          as: "statusChecks",
          limit: 1,
          order: [["checkedAt", "DESC"]],
        },
      ],
    });
  }

  async getTargetById(userId: string, targetId: string) {
    const target = await Target.findOne({
      where: { id: targetId, userId },
      include: ["statusChecks", "expiryCheck"],
    });

    if (!target) {
      throw new APIError(404, "Target not found");
    }

    return target;
  }

  async updateTarget(userId: string, targetId: string, data: any) {
    const target = await this.getTargetById(userId, targetId);
    return target.update(data);
  }

  async deleteTarget(userId: string, targetId: string) {
    const target = await this.getTargetById(userId, targetId);
    await target.destroy();
    return { message: "Target deleted successfully" };
  }
}

export default new TargetsService();
