import mysql from "mysql2/promise";

class DB {
  static async connect() {
    return await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "nodemysql_db"
    });
  }
}

export default DB;