import express from "express";
import ProductController from "../controllers/ProductController.js";

const router = express.Router();

// GET all products
router.get("/", ProductController.getProducts);

// GET product by ID
router.get("/:id", ProductController.getProductById);

// CREATE product
router.post("/", ProductController.createProduct);

// UPDATE product
router.put("/:id", ProductController.updateProduct);

// DELETE product
router.delete("/:id", ProductController.deleteProduct);

export default router;