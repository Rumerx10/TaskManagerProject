import UserModel from "../model/UserModel.js";
import { TokenEncode } from "./../utility/tokenUtility.js";
import { SendEmail } from "../utility/emailUtility.js";

export const Registration = async (req, res) => {
  try {
    let reqBody = req.body;
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
  const data = await UserModel.findById(user_id);
  return res.json({ status: "success", data: data });
};

export const ProfileUpdate = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    const updated = await UserModel.findByIdAndUpdate(user_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.json({ status: "fail", message: "User not found" });
    }

    return res.json({
      status: "success",
      message: "Profile Updated",
      data: updated,
    });
  } catch (error) {
    return res.json({ status: "fail", message: error.message });
  }
};

export const EmailVerify = async (req, res) => {
  try {
    const email = req.params.email;
    let data = await UserModel.findOne({ email: email });
    if (!data) {
      return res.json({ status: "fail", message: "Email not found" });
    } else {
      let code = Math.floor(1000 + Math.random() * 9000);
      console.log("CODEEEEEEEEEEEE=>", code);
      let EmailTo = email;
      let EmailSubject = "Email Verification";
      let EmailText = "You code is " + code;
      await SendEmail(EmailTo, EmailSubject, EmailText);
      await UserModel.updateOne({ email: email }, { otp: code });
      return res.json({
        status: "success",
        message: "Verification code sent to your email. Check email.",
      });
    }
  } catch (error) {
    return res.json({ status: "fail", message: error.message });
  }
};

export const CodeVerify = async (req, res) => {
  try {
    const email = req.params.email;
    const code = req.params.code;

    let user = await UserModel.findOne({ email: email, otp: code });
    if (!user) {
      return res.json({ status: "fail", message: "Invalid Code" });
    } else {
      return res.json({ status: "success", message: "Code Verified" });
    }
  } catch (error) {
    return res.json({ status: "fail", message: error.message });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    let data = await UserModel.findOne({
      email: req.body.email,
      otp: req.body.code,
    });
    if (!data) {
      return res.json({ status: "fail", message: "Invalid Code" });
    } else {
      await UserModel.updateOne(
        { email: req.body.email },
        { password: req.body.password, otp: 0 }
      );
    }
    return res.json({
      status: "success",
      message: "Password Reset Successfull.",
    });
  } catch (error) {
    return res.json({ status: "fail", message: error.message });
  }
};
