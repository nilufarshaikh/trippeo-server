import jwt from "jsonwebtoken";

const verifyAuthToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid authorization header" });
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Authorization token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ success: false, error: "Invalid token" });
  }
};

export default verifyAuthToken;
