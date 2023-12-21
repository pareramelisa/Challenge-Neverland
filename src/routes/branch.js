const { createBranch, getAllBranches, getBranchById, updateBranchById } = require("../controllers/branchControllers");

const branchRouter = require("express").Router();

branchRouter.post("/create", createBranch);
branchRouter.get("/all", getAllBranches);
branchRouter.get("/:branchId", getBranchById);
branchRouter.patch("/update/:branchId", updateBranchById);

module.exports = branchRouter;