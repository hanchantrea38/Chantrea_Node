import DB from "../config/db.js";
import ProductController from "../controllers/ProductController.js";
import BaseModel from "./BaseModel.js";

class Product extends BaseModel {
  static async getAll() {
    const conn = await DB.connect();
    const [rows] = await conn.execute("SELECT * FROM products");
    return rows;
  }

  static async getById(id) {
    const conn = await DB.connect();
    const [rows] = await conn.execute(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  static async create({ name, price }) {
    const conn = await DB.connect();
    const [result] = await conn.execute(
      "INSERT INTO products (name, price) VALUES (?, ?)",
      [name, price]
    );
    return result;
  }

  static async update(id, { name, price }) {
    const conn = await DB.connect();
    const [result] = await conn.execute(
      "UPDATE products SET name = ?, price = ? WHERE id = ?",
      [name, price, id]
    );
    return result;
  }

  static async delete(id) {
    const conn = await DB.connect();
    const [result] = await conn.execute(
      "DELETE FROM products WHERE id = ?",
      [id]
    );
    return result;
  }

  static async find(name) {
    const conn = await DB.connect();
    const [rows] = await conn.execute(
      "SELECT * FROM products WHERE name LIKE ?",
      [`%${name}%`]
    );
    return rows;
  }
}

export default Product;