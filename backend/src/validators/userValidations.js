const Joi = require('joi');

module.exports = {
  register: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      phone_number: Joi.string().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  },

  login: (req, res, next) => {
    console.log(req.body)
    const schema = Joi.object({
      phone_number: Joi.string().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  },
};
