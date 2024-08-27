const express = require("express");
const router = express.Router();
//CONTROLLER
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
} = require("../controllers/PhotoController");
// MIDDLEWARES
const { photoInsertValidation } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");
// ROUTES
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/:id", authGuard, getPhotoById);

module.exports = router;
