require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function validateJwt(req, res, next) {
   const token = req.header("x-auth-token");

   if (!token) {
      return res.status(401).json({ auth: "No token provided." });
   }

   try {
      const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.user = decodedToken;
      next();
   } catch {
      return res.status(401).json({ auth: "Unauthorized token." });
   }
};
