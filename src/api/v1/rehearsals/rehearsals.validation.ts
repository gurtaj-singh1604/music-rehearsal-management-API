import Joi from "joi";

const rehearsalDateSchema = Joi.string().isoDate().messages({
  "string.isoDate": '"date" must be a valid ISO 8601 date string',
  "string.empty": '"date" is not allowed to be empty',
});

const goalsSchema = Joi.array()
  .items(Joi.string().trim().min(1))
  .min(1)
  .messages({
    "array.min": '"goals" must contain at least 1 item',
  });

export const createRehearsalSchema = Joi.object({
  date: rehearsalDateSchema.required(),
  location: Joi.string().trim().min(1).max(100).required(),
  goals: goalsSchema.required(),
  setlistId: Joi.string().trim().min(1).required(),
});

export const updateRehearsalSchema = Joi.object({
  date: rehearsalDateSchema,
  location: Joi.string().trim().min(1).max(100),
  goals: goalsSchema,
  setlistId: Joi.string().trim().min(1),
}).min(1);

export const upcomingRehearsalsQuerySchema = Joi.object({
  hoursAhead: Joi.number().integer().positive(),
  location: Joi.string().trim().min(1).max(100),
  sortOrder: Joi.string().valid("asc", "desc"),
});