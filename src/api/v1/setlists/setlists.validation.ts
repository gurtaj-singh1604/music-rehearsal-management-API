import Joi from "joi";

export const createSetlistSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  songIds: Joi.array().items(Joi.string().trim().min(1)).required(),
  notes: Joi.string().trim().allow("").optional(),
});

export const updateSetlistSchema = Joi.object({
  name: Joi.string().trim().min(1),
  songIds: Joi.array().items(Joi.string().trim().min(1)),
  notes: Joi.string().trim().allow(""),
}).min(1);