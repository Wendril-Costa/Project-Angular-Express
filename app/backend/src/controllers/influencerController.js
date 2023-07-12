const { influencerService } = require('../services/influencerService');

const influencerController = {
    create: async (req, res) => {
      const register = req.body;
      const { code } = await influencerService.create(register);
      return res.status(code).json({ message: 'Criado com sucesso'});

    },
};

module.exports = {
    influencerController,
};