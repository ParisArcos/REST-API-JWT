import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import {
  verifyToken,
  isAdmin,
  isModerator,
  checkRoles,
  checkDuplicatedValues,
} from "../middlewares";
const router = Router();

router.post("/", [verifyToken, isAdmin, checkRoles], createUser);

export default router;
