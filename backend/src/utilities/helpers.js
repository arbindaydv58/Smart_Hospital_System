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
    .replace(/^"+|"+$/g, "") // remove surrounding quotes
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
