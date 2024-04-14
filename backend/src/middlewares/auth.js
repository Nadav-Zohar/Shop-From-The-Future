import JWT from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send("Unauthorized: Invalid token");
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).send(`Unauthorized: ${error.message}`);
  }
};
