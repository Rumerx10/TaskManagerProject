import { JWT_SECRET } from "../config/config.js";
import { TokenDecode } from "../utility/tokenUtility.js";

export default async (req, res, next) => {
  let token = req.headers["token"];
  let decoded = await TokenDecode(token);

  console.log(decoded);

  if (decoded === null) {
    res.status(401).send({ status: "fail", message: "Unauthorized" });
  } else {
    let email = decoded["email"];
    let id = decoded["user_id"];

    req.headers.email = email;
    req.headers.user_id = id;

    next();
  }
};
