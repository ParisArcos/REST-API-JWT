import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/products.controller";

import { verifyToken, isAdmin, isModerator } from "../middlewares";
const router = Router();

router.post("/", [verifyToken, isModerator], createProduct);

router.get("/", getProducts);
router.get("/:productId", getProductById);

router.put("/:productId", [verifyToken, isModerator], updateProductById);

router.delete("/:productId", [verifyToken, isAdmin], deleteProductById);

export default router;
