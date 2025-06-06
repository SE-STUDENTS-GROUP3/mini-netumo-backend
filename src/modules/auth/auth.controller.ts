import { Request, Response } from "express";
import AuthService from "./auth.service";
import { sendSuccess, sendError } from "../../core/apiResponse";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.register(email, password);
      sendSuccess(res, user, "User registered successfully", 201);
    } catch (error) {
      sendError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      sendSuccess(res, { user, token }, "Login successful");
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default new AuthController();
