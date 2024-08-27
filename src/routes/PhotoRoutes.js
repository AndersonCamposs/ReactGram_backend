const express = require("express");
const router = express.Router();
//CONTROLLER
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
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
router.get("/user/:id", authGuard, getUserPhotos);

router.get("/", authGuard, getAllPhotos);
module.exports = router;
