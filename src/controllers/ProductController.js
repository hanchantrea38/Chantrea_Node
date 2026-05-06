import Product from "../models/ProductModel.js";
import BaseController from "./BaseController.js";

class ProductController {
  // GET all products
  static async getProducts(req, res) {
    try {
      const products = await Product.getAll();

      return BaseController.sendSuccess(
        res,
        "Products fetched successfully",
        products
      );
    } catch (error) {
      return BaseController.sendError(res, error.message);
    }
  }

  // GET product by ID
  static async getProductById(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.getById(id);

      if (!product) {
        return BaseController.sendError(res, "Product not found", 404);
      }

      return BaseController.sendSuccess(
        res,
        "Product fetched successfully",
        product
      );
    } catch (error) {
      return BaseController.sendError(res, error.message);
    }
  }

  // CREATE product
  static async createProduct(req, res) {
    try {
      const { name, price } = req.body;

      if (!name || price === undefined) {
        return BaseController.sendError(
          res,
          "Name and price are required",
          400
        );
      }

      const result = await Product.create({ name, price });

      return BaseController.sendSuccess(
        res,
        "Product created successfully",
        {
          id: result.insertId,
          name,
          price
        },
        201
      );
    } catch (error) {
      return BaseController.sendError(res, error.message);
    }
  }

  // UPDATE product
  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, price } = req.body;

      const existingProduct = await Product.getById(id);

      if (!existingProduct) {
        return BaseController.sendError(res, "Product not found", 404);
      }

      await Product.update(id, { name, price });

      const updatedProduct = await Product.getById(id);

      return BaseController.sendSuccess(
        res,
        "Product updated successfully",
        updatedProduct
      );
    } catch (error) {
      return BaseController.sendError(res, error.message);
    }
  }

  // DELETE product
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const existingProduct = await Product.getById(id);

      if (!existingProduct) {
        return BaseController.sendError(res, "Product not found", 404);
      }

      await Product.delete(id);

      return BaseController.sendSuccess(
        res,
        "Product deleted successfully",
        { id: Number(id) }
      );
    } catch (error) {
      return BaseController.sendError(res, error.message);
    }
  }
}

export default ProductController;