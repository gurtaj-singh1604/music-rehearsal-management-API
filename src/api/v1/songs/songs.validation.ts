import Joi from "joi";

const songStatusValues = ["new", "learning", "ready"] as const;

export const createSongSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  artist: Joi.string().trim().min(1).required(),
  key: Joi.string().trim().min(1).required(),
  tempo: Joi.number().positive().required(),
  duration: Joi.number().positive().required(),
  genre: Joi.string().trim().min(1).required(),
  status: Joi.string()
    .valid(...songStatusValues)
    .required(),
});

export const updateSongSchema = Joi.object({
  title: Joi.string().trim().min(1),
  artist: Joi.string().trim().min(1),
  key: Joi.string().trim().min(1),
  tempo: Joi.number().positive(),
  duration: Joi.number().positive(),
  genre: Joi.string().trim().min(1),
  status: Joi.string().valid(...songStatusValues),
}).min(1);