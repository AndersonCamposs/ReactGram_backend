const express = require("express");
const router = express.Router();

// CONTROLLER
const {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
} = require("../controllers/UserController");

// MIDDLEWARES
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  userLoginValidation,
  userUpdateValidation,
} = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

// ROUTES
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", userLoginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
);
router.get("/:id", getUserById);

module.exports = router;
