import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] ?? "";

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
      (req as any).userId = (decoded as any).userId;
      next();
    }
  } catch (error) {
    res.status(403).json({
      message: "Unauthorized",
    });
  }
}
