const { StatusCodes } = require('http-status-codes');
const { Influencer } = require('../database/models')

const influencerFindAll = async (req, res, next) => {
    try {
        const influencers = await Influencer.findAll({
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
    
        if (!influencers || influencers.length === 0) {
          return res.status(StatusCodes.NOT_FOUND).json({ message: 'Nenhum influenciador encontrado.' });
        }
    
        res.locals.influencers = influencers;
        next();
      } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro interno do servidor.' });
      }
};

module.exports = influencerFindAll;