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
}

module.exports = {
    influencerService,
};