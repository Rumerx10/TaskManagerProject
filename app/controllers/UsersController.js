import UserModel from "../model/UserModel.js";
import { TokenEncode } from "./../utility/tokenUtility.js";

export const Registration = async (req, res) => {
  try {
    let reqBody = req.body;
    console.log(reqBody);
    await UserModel.create(reqBody);
    return res.json({ status: "success", message: "Registration Successfull" });
  } catch (error) {
    return res.json({ status: "fail", message: error.message });
  }
  return res.json({ status: "success", message: "Registration Successfull" });
};

export const Login = async (req, res) => {
  try {
    const reqBody = req.body;
    let data = await UserModel.findOne(reqBody);
    if (!data) {
      return res.json({ status: "fail", message: "Invalid Credentials" });
    } else {
      let token = await TokenEncode(data.email, data._id);
      return res.json({
        status: "success",
        Token: token,
        message: "Login Successfull",
      });
    }
  } catch (error) {
    return res.json({ status: "fail", message: error.message });
  }
};

export const ProfileDetails = async (req, res) => {
  let user_id = req.headers.user_id;
  console.log(user_id);
  const data = await UserModel.findById(user_id);
  return res.json({ status: "success", data: data });
};

export const ProfileUpdate = async (req, res) => {
  return res.json({ status: "success", message: "Profile Updated" });
};

export const EmailVerify = async (req, res) => {
  return res.json({ status: "success", message: "Email Verified" });
};

export const CodeVerify = async (req, res) => {
  return res.json({ status: "success", message: "Code Verified" });
};

export const ResetPassword = async (req, res) => {
  return res.json({ status: "success", message: "Password Reset" });
};
