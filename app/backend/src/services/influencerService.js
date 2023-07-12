const { Influencer } = require('../database/models')
const { StatusCodes } = require('http-status-codes');

const influencerService = {
    create: async (register) => {
        await Influencer.create(register); 
        return { code: StatusCodes.CREATED };
    },
}

module.exports = {
    influencerService,
};