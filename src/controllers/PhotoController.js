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

module.exports = {
  insertPhoto,
};
