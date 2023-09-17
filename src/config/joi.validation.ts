import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGO_URL: Joi.required().messages({
    'any.required': 'Please provide environment variable {#key}',
  }),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(10),
});
