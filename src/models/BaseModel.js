class BaseModel {
  constructor() {
    if (this.constructor === BaseModel) {
      throw new Error("Cannot instantiate abstract class BaseModel");
    }
  }

  // Abstract methods (must override)
  static async getAll() {
    throw new Error("getAll() must be implemented");
  }

  static async getById(id) {
    throw new Error("getById() must be implemented");
  }

  static async create(data) {
    throw new Error("create() must be implemented");
  }

  static async update(id, data) {
    throw new Error("update() must be implemented");
  }

  static async delete(id) {
    throw new Error("delete() must be implemented");
  }

  static async find(condition) {
    throw new Error("find() must be implemented");
  }
}

export default BaseModel;