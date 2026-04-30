import DB from "../config/db.js";

class User {
  // GET all users
  static async getAll() {
    const conn = await DB.connect();
    const [rows] = await conn.execute("SELECT * FROM users");
    return rows;
  }

  // GET user by ID
  static async getById(id) {
    const conn = await DB.connect();
    const [rows] = await conn.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return rows[0]; // return single user
  }

  // CREATE user
  static async create({ name}) {
    const conn = await DB.connect();
    const [result] = await conn.execute(
      "INSERT INTO users (name) VALUES (?)",
      [name]
    );
    return result;
  }

  // UPDATE user
  static async update(id, { name}) {
    const conn = await DB.connect();
    const [result] = await conn.execute(
      "UPDATE users SET name = ? WHERE id = ?",
      [name, id]
    );
    return result;
  }

  // DELETE user
  static async delete(id) {
    const conn = await DB.connect();
    const [result] = await conn.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    return result;
  }
}

export default User;