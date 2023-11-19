import Joi from 'joi';

export const movieSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  releaseYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
  status: Joi.string().valid('AVAILABLE', 'UNAVAILABLE').required()
});

export const validateMovie = (req, res, next) => {
  const { error } = movieSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
};
