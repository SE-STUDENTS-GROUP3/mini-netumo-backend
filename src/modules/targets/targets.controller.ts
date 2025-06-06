import { Request, Response } from "express";
import TargetsService from "./targets.service";
import { sendSuccess, sendError } from "../../core/apiResponse";

class TargetsController {
  async createTarget(req: Request, res: Response) {
    try {
      const target = await TargetsService.createTarget(req.user.id, req.body);
      sendSuccess(res, target, "Target created successfully", 201);
    } catch (error) {
      sendError(res, error);
    }
  }

  async getTargets(req: Request, res: Response) {
    try {
      const targets = await TargetsService.getTargets(req.user.id);
      sendSuccess(res, targets);
    } catch (error) {
      sendError(res, error);
    }
  }

  async getTarget(req: Request, res: Response) {
    try {
      const target = await TargetsService.getTargetById(
        req.user.id,
        req.params.id
      );
      sendSuccess(res, target);
    } catch (error) {
      sendError(res, error);
    }
  }

  async updateTarget(req: Request, res: Response) {
    try {
      const target = await TargetsService.updateTarget(
        req.user.id,
        req.params.id,
        req.body
      );
      sendSuccess(res, target, "Target updated successfully");
    } catch (error) {
      sendError(res, error);
    }
  }

  async deleteTarget(req: Request, res: Response) {
    try {
      const result = await TargetsService.deleteTarget(
        req.user.id,
        req.params.id
      );
      sendSuccess(res, result);
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default new TargetsController();
