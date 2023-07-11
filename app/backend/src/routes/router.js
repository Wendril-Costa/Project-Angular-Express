const express = require('express')

const influencerRouter = require('./influencer.router')

const routers = express.Router()
routers.use('/influencer', influencerRouter)

module.exports = routers