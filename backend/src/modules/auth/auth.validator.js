import Joi from "joi";

export const RegisterUserDTO = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .allow("ADMIN", "DOCTOR", "PATIENT")
    .optional()
    .default("PATIENT"),
  profileImage: Joi.string().allow(null, "").optional().default(null),
  specialization: Joi.string().optional(),
  departmentId: Joi.number().optional(),
  phone: Joi.string().allow(null, "").optional().default(null),
});
