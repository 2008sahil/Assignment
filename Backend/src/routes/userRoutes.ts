import express from "express";
import {
  createUser,
  saveMutualFriends,
  searchUsers,
  softDeleteUser,
  updateUser,
  listUsers
} from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);

router.post("/friends", saveMutualFriends);

router.get("/search", searchUsers);

router.delete("/:name", softDeleteUser);

router.patch("/:name", updateUser);

router.get("/", listUsers);

export default router;