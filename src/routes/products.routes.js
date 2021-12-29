import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/products.controller";
const router = Router();

router.get("/", getProducts);
router.get("/:productId", getProductById);

router.post("/", createProduct);

router.put("/:productId", updateProductById);

router.delete("/:productId", deleteProductById);

export default router;
