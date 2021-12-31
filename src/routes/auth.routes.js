import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";
import { checkDuplicatedValues, checkRoles } from "../middlewares";
const router = Router();

router.post("/signin", signIn);
router.post("/signup", [checkDuplicatedValues, checkRoles], signUp);

export default router;
