const { StatusCodes } = require('http-status-codes');
const { Influencer } = require('../database/models');

const influencerValidations = {
  validateId: async (req, res, next) => {
    const { id } = req.params;

    try {
      const influencer = await Influencer.findByPk(id);

      if (!influencer) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Influenciador não encontrado.' });
      }

      next();
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro interno do servidor.' });
    }
  },

};

module.exports = influencerValidations;
