import fs from "fs";

export const deleteFile = async (filepath) => {
  if (fs.existsSync(filepath)) {
    return fs.unlinkSync(filepath);
  }
  return false;
};

export const normalizeRole = (role) => {
  // default role
  if (!role) return "PATIENT";

  const cleaned = String(role)
    .replace(/^"+|"+$/g, "")
    .trim()
    .toUpperCase();

  const allowedRoles = ["ADMIN", "DOCTOR", "PATIENT"];

  if (!allowedRoles.includes(cleaned)) {
    throw {
      statusCode: 400,
      message: `Invalid role. Allowed roles: ${allowedRoles.join(", ")}`,
    };
  }

  return cleaned;
};

export const randomStringGenerate = (length = 100) => {
  const chars =
    "0123456789abcdefghijklemnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const len = chars.length;
  let randomStr = "";
  for (let i = 1; i <= length; i++) {
    const posn = Math.ceil(Math.random() * (len - 1));
    randomStr += chars[posn];
  }
  return randomStr
};
