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

    update: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;
        const { code } = await influencerService.update(id, updates);
        return res.status(code).json({ message: 'Atualizado com sucesso' });
      },
    
    delete: async (req, res) => {
      const { id } = req.params;
      const { code } = await influencerService.delete(id);
      return res.status(code).json({ message: 'Excluído com sucesso' });
    },
};

module.exports = {
    influencerController,
};