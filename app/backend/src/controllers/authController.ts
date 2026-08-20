import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { UserModel } from "../models/User";
import type { AuthRequest } from "../middleware/auth";

function issueSession(res: Response, user: { id: string; email: string }) {
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function publicUser(user: { _id: unknown; email: string }) {
  return { id: String(user._id), email: user.email };
}

export async function register(req: Request, res: Response) {
  const email = String(req.body?.email || "")
    .trim()
    .toLowerCase();
  const password = String(req.body?.password || "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8)
    return res
      .status(400)
      .json({
        message:
          "Valid email and password of at least 8 characters are required",
      });
  try {
    if (await UserModel.exists({ email }))
      return res.status(409).json({ message: "Email already registered" });
    const user = await UserModel.create({
      email,
      passwordHash: await bcrypt.hash(password, 12),
    });
    issueSession(res, { id: String(user._id), email: user.email });
    return res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000)
      return res.status(409).json({ message: "Email already registered" });
    if (error && typeof error === "object" && "name" in error && String(error.name).includes("Mongo"))
      return res.status(503).json({ message: "Database is unavailable. Check the MongoDB connection." });
    throw error;
  }
}

export async function login(req: Request, res: Response) {
  const email = String(req.body?.email || "")
    .trim()
    .toLowerCase();
  const password = String(req.body?.password || "");
  const user = await UserModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(401).json({ message: "Invalid email or password" });
  issueSession(res, { id: String(user._id), email: user.email });
  return res.json({ user: publicUser(user) });
}

export function logout(_req: Request, res: Response) {
  res.clearCookie("token");
  return res.status(204).send();
}
export function me(req: AuthRequest, res: Response) {
  return res.json({ user: req.user });
}
