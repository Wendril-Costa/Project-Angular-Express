const { expect } = require('chai');
const sinon = require('sinon');
const { influencerController } = require('../controllers/influencerController');
const { influencerService } = require('../services/influencerService');
const influencerId = require('../middlewares/influencerId');
const { Influencer } = require('../database/models');
const { StatusCodes } = require('http-status-codes');

describe('Influencer Update', () => {
  describe('Controller', () => {
    it('Deve atualizar um influenciador', async () => {
      const id = 1;
      const updateData = {
        name: 'Updated Influencer',
        email: 'updated@example.com',
        category: 'Updated Category',
        numberSubscribers: 1000,
        platform: 'Updated Platform',
        channelName: 'Updated Channel',
        description: 'Updated Description',
        nickName: 'Updated Nickname',
      };

      const updateStub = sinon.stub(influencerService, 'update').resolves({ code: StatusCodes.OK });

      const req = { params: { id }, body: updateData };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await influencerController.update(req, res);

      expect(updateStub.calledOnceWith(id, updateData)).to.be.true;
      expect(res.status.calledWith(StatusCodes.OK)).to.be.true;
      expect(res.json.calledWith({ message: 'Atualizado com sucesso' })).to.be.true;

      updateStub.restore();
    });   
  });

  describe('Middleware', () => {
    let findByPkStub;

    beforeEach(() => {
      findByPkStub = sinon.stub(Influencer, 'findByPk');
    });

    afterEach(() => {
      findByPkStub.restore();
    });

    it('Deve passar pela validação e lidar em seguida se o influenciador existir', async () => {
      const id = 1;
      const influencer = { id: 1, name: 'Influencer' };

      findByPkStub.resolves(influencer);

      const req = { params: { id } };
      const res = {};
      const next = sinon.stub();

      await influencerId.validateId(req, res, next);

      expect(findByPkStub.calledOnceWith(id)).to.be.true;
      expect(next.calledOnce).to.be.true;
    });

    it('Deve retornar um status 404 se o influenciador não existir', async () => {
      const id = 1;

      findByPkStub.resolves(null);

      const req = { params: { id } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub();

      await influencerId.validateId(req, res, next);

      expect(findByPkStub.calledOnceWith(id)).to.be.true;
      expect(res.status.calledWith(StatusCodes.NOT_FOUND)).to.be.true;
      expect(res.json.calledWith({ message: 'Influenciador não encontrado.' })).to.be.true;
      expect(next.called).to.be.false;
    });

    it('Deve lidar com erro interno do servidor durante a validação', async () => {
      const id = 1;
      const error = new Error('Internal Server Error');

      findByPkStub.throws(error);

      const req = { params: { id } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub();

      await influencerId.validateId(req, res, next);

      expect(findByPkStub.calledOnceWith(id)).to.be.true;
      expect(res.status.calledWith(StatusCodes.INTERNAL_SERVER_ERROR)).to.be.true;
      expect(res.json.calledWith({ message: 'Erro interno do servidor.' })).to.be.true;
      expect(next.called).to.be.false;
    });
  });
});
