import UserRepository from "../repositories/UserRepository.js";

class UserService {

  static async getUsers() {
    return await UserRepository.getAll();
  }

  static async getUserById(id) {
    return await UserRepository.getById(id);
  }

  static async createUser(name) {

    if (!name) {
      throw new Error("Name is required");
    }

    return await UserRepository.create(name);
  }

  static async updateUser(id, name) {

    const existingUser = await UserRepository.getById(id);

    if (!existingUser) {
      throw new Error("User not found");
    }

    return await UserRepository.update(id, name);
  }

  static async deleteUser(id) {

    const existingUser = await UserRepository.getById(id);

    if (!existingUser) {
      throw new Error("User not found");
    }

    return await UserRepository.delete(id);
  }
}

export default UserService;