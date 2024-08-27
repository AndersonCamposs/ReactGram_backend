const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");

// INSERT A PHOTO, WITH AN USER RELATED TO IT

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;
  const reqUser = req.user;
  try {
    // IF FIND AN USER
    const user = await User.findById(reqUser._id);
    // CREATE NEW PHOTO
    const newPhoto = await Photo.create({
      image,
      title,
      userId: user._id,
      userName: user.name,
    });
    // IF PHOTO WAS CREATED SUCCESSFULLY, RETURN DATA
    if (!newPhoto) {
      return res
        .status(422)
        .json({ errors: ["Houve um erro. Tente novamente mais tarde."] });
    }
    return res.status(201).json(newPhoto);
  } catch (error) {
    return res
      .status(422)
      .json({ errors: ["Houve um erro. Tente novamente mais tarde."] });
  }
};

// DELETE A PHOTO FORM DATABASE
const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    // CHECK IF PHOTO EXISTS
    if (!photo) {
      res.send(404).json({ errors: ["Foto não encontrada"] });
    }

    // CHECK IF PHOTOS BELONGS TO USER
    if (!photo.userId.equals(reqUser._id)) {
      return res
        .status(422)
        .json({ errors: ["Houve um erro. Tente novamente mais tarde."] });
    }

    await Photo.findByIdAndDelete(photo._id);

    return res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso." });
  } catch (error) {
    return res
      .status(404)
      .json({ errors: ["Houve um erro. Tente novamente mais tarde."] });
  }
};

// GET ALL PHOTOS
const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({})
      .sort([["createdAt", -1]])
      .exec();

    return res.status(200).json(photos);
  } catch (error) {
    return res
      .status(422)
      .json({ errors: ["Houve um erro. Tente novamente mais tarde."] });
  }
};

// GET USER PHOTOS
const getUserPhotos = async (req, res) => {
  const { id } = req.params;
  try {
    const photos = await Photo.find({ userId: id }).sort([["createdAt", -1]]);

    return res.status(200).json({ photos });
  } catch (error) {
    return res
      .status(422)
      .json({ errors: ["Houve um erro. Tente novamente mais tarde."] });
  }
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
};
