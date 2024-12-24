import * as path from "node:path";

export const MONGODB_CONNECTION =
  "mongodb+srv://rume:rume@cluster0.dwa2j.mongodb.net/user_db?retryWrites=true&w=majority";

export const JWT_SECRET = "5EC7CEFA1BE7C9354A639369A2AA8";
export const JWT_EXPIRATION_TIME = 60 * 60 * 1000;

export const EMAIL_HOST = "smtp.titan.email";
export const EMAIL_PORT = "465";
export const EMAIL_USER = "support@laravelpoint.com";
export const EMAIL_PASSWORD = "Rup77_4827";
export const MAIL_ENCRIPTION = "ssl";
export const MAIL_SECURITY = false;

export const MAX_JSON_SIZE = "50mb";
export const URL_ENCODED = true;

export const REQUEST_LIMIT_TIME = 15 * 60 * 1000;
export const REQUEST_LIMIT_NUMBER = 3000;

export const WEB_CACHE = false;
export const PORT = 8000;

// used these three function for same work ( crating file path to upload file).
export const CREATE_FILE_PATH = (fileName) => {
  // my
  return path.resolve(process.cwd(), "storage", fileName);
};
export const UPLOAD_FILE = (fileName) => {
  // ostad
  return path.resolve(process.cwd(), "storage", fileName);
};
export function UPLOAD_FOLDER(filename) {
  return path.resolve(process.cwd(), "storage", filename);
}
