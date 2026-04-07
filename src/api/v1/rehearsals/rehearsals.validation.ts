import Joi from "joi";

export const createRehearsalSchema = Joi.object({
  date: Joi.string().trim().min(1).required(),
  location: Joi.string().trim().min(1).required(),
  goals: Joi.array().items(Joi.string().trim().min(1)).required(),
  setlistId: Joi.string().trim().min(1).required(),
});

export const updateRehearsalSchema = Joi.object({
  date: Joi.string().trim().min(1),
  location: Joi.string().trim().min(1),
  goals: Joi.array().items(Joi.string().trim().min(1)),
  setlistId: Joi.string().trim().min(1),
}).min(1);