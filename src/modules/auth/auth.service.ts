import jwt from "jsonwebtoken";
import User from "../../db/models/User";
import { APIError } from "../../core/errors";
import logger from "../../core/logger";

class AuthService {
  async register(email: string, password: string) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new APIError(400, "Email already in use");
    }

    const user = await User.create({ email, password });
    return user;
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new APIError(401, "Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new APIError(401, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { user, token };
  }

  async validateToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        email: string;
      };
    } catch (err) {
      logger.error("Token validation failed:", err);
      throw new APIError(401, "Invalid token");
    }
  }
}

export default new AuthService();
