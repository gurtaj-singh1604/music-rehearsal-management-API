import Joi from "joi";

export const registerUserSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).required(),
  displayName: Joi.string().trim().min(1).optional(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).required(),
});