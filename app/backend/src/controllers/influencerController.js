const { influencerService } = require('../services/influencerService');
const { StatusCodes } = require('http-status-codes');

const influencerController = {
    create: async (req, res) => {
      const register = req.body;
      console.log(register)
      try {
        const { code, message } = await influencerService.create(register);
        if (message) return res.status(code).json({ message });
      
        return res.status(code).json({ message: 'Criado com sucesso'});
      } catch (error) {
        console.log("erro", error)
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro Interno' });
        }
    },
};

module.exports = {
    influencerController,
};