import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

// GET all users
router.get("/", UserController.getUsers);

// GET user by id
router.get("/:id", UserController.getUserById);

// CREATE user
router.post("/", UserController.createUser);    

// UPDATE user
router.put("/:id", UserController.updateUser);

// DELETE user
router.delete("/:id", UserController.deleteUser);

export default router;