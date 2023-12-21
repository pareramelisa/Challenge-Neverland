const { createUser, loginUser, getAllUsers, getUserById, deleteUserById, updateUserById } = require("../controllers/userControllers");

const userRouter = require("express").Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser)
userRouter.get("/all", getAllUsers)
userRouter.get("/:userId", getUserById)
userRouter.delete("/delete/:userId", deleteUserById)
userRouter.patch("/update/:userId", updateUserById)

module.exports = userRouter;
