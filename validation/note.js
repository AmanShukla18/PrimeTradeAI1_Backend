const Joi = require('joi');

const noteValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(1).required(),
    category: Joi.string().max(50).optional()
  });
  
  return schema.validate(data);
};

const updateNoteValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).optional(),
    content: Joi.string().min(1).optional(),
    category: Joi.string().max(50).optional()
  });
  
  return schema.validate(data);
};

module.exports = {
  noteValidation,
  updateNoteValidation
};