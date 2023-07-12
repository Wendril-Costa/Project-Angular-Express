const { expect } = require('chai');
const sinon = require('sinon');
const { influencerController } = require('../controllers/influencerController');
const { influencerService } = require('../services/influencerService');
const { Influencer } = require('../database/models');
const { StatusCodes } = require('http-status-codes');

describe('Influencer Delete', () => {
  describe('Controller', () => {
    it('should delete the influencer successfully', async () => {
      const id = 1;
      const deleteStub = sinon.stub(influencerService, 'delete').resolves({ code: StatusCodes.OK });

      const req = { params: { id } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await influencerController.delete(req, res);

      expect(deleteStub.calledOnceWith(id)).to.be.true;
      expect(res.status.calledWith(StatusCodes.OK)).to.be.true;
      expect(res.json.calledWith({ message: 'Excluído com sucesso' })).to.be.true;

      deleteStub.restore();
    });
  });

  describe('Service', () => {
    it('should delete the influencer successfully', async () => {
      const id = 1;
      const destroyStub = sinon.stub(Influencer, 'destroy').resolves();

      const result = await influencerService.delete(id);

      expect(destroyStub.calledOnceWith({ where: { id } })).to.be.true;
      expect(result.code).to.equal(StatusCodes.OK);

      destroyStub.restore();
    });
  });
});
