const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

// GENERATE USER TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
};

// GENERATE SALT AND PASSWORD HASH
const generateHash = async (password) => {
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

// REGISTER USER AND SIGN IN
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // CHECK IF USER EXISTS
    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).json({
        errors: ["Já existe um usuário registrado com este error-mail"],
      });
    }

    // GENERATE PASSWORD HASH
    const passwordHash = await generateHash(password);

    // CREATE USER
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
    });

    // IF USER WAS CREATED SUCCESSFULY, RETURN THE JSON WEB TOKEN
    if (!newUser) {
      return res.status(422).json({
        errors: [
          "Houve algum erro na criação de usuário. Tente novamente mais tarde.",
        ],
      });
    }

    return res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.log(error);
  }
};

// SIGN USER IN
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // CHECK IF USER EXISTS
    if (!user) {
      return res.status(404).json({ errors: ["Usuário não encontrado"] });
    }

    // CHECK IF PASSWORD MATCHES
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(422).json({ errors: ["Senha inválida"] });
    }

    // RETURN USER WITH TOKEN
    return res.status(201).json({
      _id: user._id,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
  }
};

// GET CURRENT LOGGED IN USER
const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};

// UPDATE AN USER
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.profileImage) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  try {
    const user = await User.findById(
      new mongoose.Types.ObjectId(req.user._id)
    ).select("-password");

    if (name) {
      user.name = name;
    }

    if (password) {
      user.password = await generateHash(password);
    }

    if (profileImage) {
      user.profileImage = profileImage;
    }

    if (bio) {
      user.bio = bio;
    }

    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
};
