import DB from "../config/db.js";

class UserRepository {

  static async getAll() {
    const conn = await DB.connect();

    const [rows] = await conn.execute(
      "SELECT * FROM users"
    );

    return rows;
  }

  static async getById(id) {
    const conn = await DB.connect();

    const [rows] = await conn.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    return rows[0];
  }

  static async create(name) {
    const conn = await DB.connect();

    const [result] = await conn.execute(
      "INSERT INTO users (name) VALUES (?)",
      [name]
    );

    return result;
  }

  static async update(id, name) {
    const conn = await DB.connect();

    const [result] = await conn.execute(
      "UPDATE users SET name = ? WHERE id = ?",
      [name, id]
    );

    return result;
  }

  static async delete(id) {
    const conn = await DB.connect();

    const [result] = await conn.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    return result;
  }
}

export default UserRepository;