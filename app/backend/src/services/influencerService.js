const { Influencer } = require('../database/models')
const { StatusCodes } = require('http-status-codes');

const influencerService = {
    create: async (register) => {
        await Influencer.create(register); 
        return { code: StatusCodes.CREATED };
    },

    findAll: async () => {
        const influencers = await Influencer
            .findAll({attributes: { exclude: ['createdAt', 'updatedAt'] } });
        return { code: StatusCodes.OK, influencers };
    },

    update: async (id, updates) => {
        await Influencer.update(updates, { where: { id } });
        return { code: StatusCodes.OK };
    },

    delete: async (id) => {
        await Influencer.destroy({ where: { id } });
        return { code: StatusCodes.OK };
    },
}

module.exports = {
    influencerService,
};