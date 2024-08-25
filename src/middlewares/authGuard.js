const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // example: Bearer lsacsdfnjkdnfjknasfn
  const token = authHeader && authHeader.split(" ")[1];

  // CHECK IG HEADER HAS A TOKEN
  if (!token) return res.status(401).json({ errors: ["Acesso negado"] });

  // CHECK IF TOKEN IS VALID
  try {
    const verified = jwt.verify(token, jwt_secret);

    req.user = await User.findById(verified.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido"] });
  }
};

module.exports = authGuard;
