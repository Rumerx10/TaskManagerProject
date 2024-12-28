import nodemailer from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  MAIL_ENCRIPTION,
  MAIL_SECURITY,
} from "../config/config.js";

export const SendEmail = async (EmailTo, EmailSubject, EmailText) => {
  let transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: MAIL_SECURITY,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: "Task Manager MERN <info@teamrabbil.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    } else {
      return info;
    }
  });
};
