import ProductRepository from "../repositories/ProductRepository.js";

class ProductService {

  static async getProducts() {
    return await ProductRepository.getAll();
  }

  static async getProductById(id) {
    return await ProductRepository.getById(id);
  }

  static async createProduct(name, price) {

    if (!name || price === undefined) {
      throw new Error("Name and price are required");
    }

    return await ProductRepository.create(name, price);
  }

  static async updateProduct(id, name, price) {

    const existingProduct = await ProductRepository.getById(id);

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    return await ProductRepository.update(id, name, price);
  }

  static async deleteProduct(id) {

    const existingProduct = await ProductRepository.getById(id);

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    return await ProductRepository.delete(id);
  }
}

export default ProductService;