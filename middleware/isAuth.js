const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Token verification failed." });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  req.user = {
    id: decodedToken.userId,
    email: decodedToken.email,
    role: decodedToken.role
  };

  next();
};
