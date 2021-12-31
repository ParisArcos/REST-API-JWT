import jwt from "jsonwebtoken";
import config from "../config/config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    const user = await User.findById(req.userId, { password: 0 });
    return token && user
      ? next()
      : res.status(404).json({ message: "No user or token found" });
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const foundRoles = await Role.find({ _id: { $in: user.roles } });
  for (let i = 0; i < foundRoles.length; i++) {
    if (foundRoles[i].name === "moderator") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require Moderator Role" });
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const foundRoles = await Role.find({ _id: { $in: user.roles } });
  for (let i = 0; i < foundRoles.length; i++) {
    if (foundRoles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require Admin Role" });
};
