const { expect } = require('chai');
const sinon = require('sinon');
const { influencerController } = require('../controllers/influencerController');
const { influencerService } = require('../services/influencerService');
const influencerFindAllMiddleware = require('../middlewares/influencerFindAll');
const { Influencer } = require('../database/models');

describe('Influencer FindAll', () => {
  describe('Controller', () => {
    it('Deve retornar todos os influenciadores', async () => {
      const influencers = [
        { id: 1, name: 'Influencer 1' },
        { id: 2, name: 'Influencer 2' },
      ];
      const findAllStub = sinon.stub(influencerService, 'findAll').resolves({ code: 200, influencers });

      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await influencerController.findAll(req, res);

      expect(findAllStub.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(influencers)).to.be.true;

      findAllStub.restore();
    });
  });

  describe('Service', () => {
    it('Deve retornar todos os influenciadores', async () => {
      const influencers = [
        { id: 1, name: 'Influencer 1' },
        { id: 2, name: 'Influencer 2' },
      ];
      const findAllStub = sinon.stub(Influencer, 'findAll').resolves(influencers);

      const result = await influencerService.findAll();

      expect(findAllStub.calledOnce).to.be.true;
      expect(result.code).to.equal(200);
      expect(result.influencers).to.deep.equal(influencers);

      findAllStub.restore();
    });
  });

  describe('Middleware', () => {
    it('Deve encontrar todos os influenciadores e armazená-los em res.locals', async () => {
      const influencers = [
        { id: 1, name: 'Influencer 1' },
        { id: 2, name: 'Influencer 2' },
      ];
      const findAllStub = sinon.stub(Influencer, 'findAll').resolves(influencers);
  
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
        locals: {},
      };
      const next = sinon.stub();
  
      await influencerFindAllMiddleware(req, res, next);
  
      expect(findAllStub.calledOnce).to.be.true;
      expect(res.locals.influencers).to.deep.equal(influencers);
      expect(next.calledOnce).to.be.true;
  
      findAllStub.restore();
    });
  
    it('Deve retornar um status 404 e uma mensagem se nenhum influenciador for encontrado', async () => {
      const findAllStub = sinon.stub(Influencer, 'findAll').resolves([]);
  
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub();
  
      await influencerFindAllMiddleware(req, res, next);
  
      expect(findAllStub.calledOnce).to.be.true;
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Nenhum influenciador encontrado.' })).to.be.true;
      expect(next.called).to.be.false;
  
      findAllStub.restore();
    });
  
    it('Deve retornar um status 500 e uma mensagem se ocorrer um erro', async () => {
      const error = new Error('Internal Server Error');
      const findAllStub = sinon.stub(Influencer, 'findAll').throws(error);
  
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub();
  
      await influencerFindAllMiddleware(req, res, next);
  
      expect(findAllStub.calledOnce).to.be.true;
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: 'Erro interno do servidor.' })).to.be.true;
      expect(next.called).to.be.false;
  
      findAllStub.restore();
    });
  });
});
