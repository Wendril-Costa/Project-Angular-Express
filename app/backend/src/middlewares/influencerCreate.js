const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const { Influencer } = require('../database/models');

const influencerValid = {
  validateBody: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required().error(new Error('O nome é obrigatório.')),
      email: Joi.string()
        .email()
        .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i)
        .required()
        .error(new Error('O e-mail deve ser válido e obrigatório.')),
      category: Joi.string().required().error(new Error('A categoria é obrigatória.')),
      numberSubscribers: Joi.number().required().error(new Error('O número de inscritos é obrigatório.')),
      platform: Joi.string().required().error(new Error('A plataforma é obrigatória.')),
      channelName: Joi.string().required().error(new Error('O nome do canal é obrigatório.')),
      description: Joi.string().required().error(new Error('A descrição é obrigatória.')),
      nickName: Joi.string().allow('').optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
    next();
  },

  checkEmailAndName: async (req, res, next) => {
    const { email, name } = req.body;

    const existingEmail = await Influencer.findOne({ where: { email } });
    const existingName = await Influencer.findOne({ where: { name } });
    if (existingEmail && existingName) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'O email ou name já está em uso.' });
    }
    if (existingEmail) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'O email já está em uso.' });
    }
    if (existingName) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'O nome já está em uso.' });
    }

    next();
  }
};

module.exports = influencerValid;
