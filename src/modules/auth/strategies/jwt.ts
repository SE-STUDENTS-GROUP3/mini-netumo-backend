import { Request, Response, NextFunction } from "express";
import AuthService from "../auth.service";
import { APIError } from "../../../core/errors";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new APIError(401, "No token provided");
    }

    const token = authHeader.split(" ")[1];
    const payload = await AuthService.validateToken(token);

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
