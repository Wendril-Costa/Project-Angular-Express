const { influencerService } = require('../services/influencerService');

const influencerController = {
    create: async (req, res) => {
      const register = req.body;
      const { code } = await influencerService.create(register);
      return res.status(code).json({ message: 'Criado com sucesso'});
    },

    findAll: async (_req, res) => {
        const { code, influencers } = await influencerService.findAll();
        return res.status(code).json(influencers);
    },
};

module.exports = {
    influencerController,
};