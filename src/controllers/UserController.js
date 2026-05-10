import User from "../models/user.js";
import BaseController from "./BaseController.js";
import UserService from "../services/UserService.js";

class UserController {
  // GET all users
  static async getUsers(req, res) {
    try {
      const users = await User.getAll();
      return BaseController.sendSuccess(res, "Users fetched successfully", users);
    } catch (error) {
      return BaseController.sendError(res, error.message);
    }
  }

  // GET user by ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.getById(id);

      if (!user) {
        return BaseController.sendError(res, "User not found", 404);
      }

      return BaseController.sendSuccess(res, "User fetched successfully", user);
    } catch (error) {
      return BaseController.sendError(res, error.message);
    }
  }

  // CREATE user
  static async createUser(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return BaseController.sendError(res, "Name is required", 400);
      }

      const result = await User.create({ name });

      return BaseController.sendSuccess(
        res,
        "User created",
        { id: result.insertId, name },
        201
      );
    } catch (error) {
      return BaseController.sendError(res, error.message);
    }
  }

  // UPDATE user
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const existingUser = await User.getById(id);

      if (!existingUser) {
        return BaseController.sendError(res, "User not found", 404);
      }

      await User.update(id, { name });

      const updatedUser = await User.getById(id);

      return BaseController.sendSuccess(res, "User updated", updatedUser);
    } catch (error) {
      return BaseController.sendError(res, error.message);
    }
  }

  // DELETE user
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const existingUser = await User.getById(id);

      if (!existingUser) {
        return BaseController.sendError(res, "User not found", 404);
      }

      await User.delete(id);

      return BaseController.sendSuccess(res, "User deleted", { id: Number(id) });
    } catch (error) {
      return BaseController.sendError(res, error.message);
    }
  }
}

export default UserController;