const { expect } = require('chai');
const { Influencer } = require('../database/models');
const sinon = require('sinon');
const { StatusCodes } = require('http-status-codes');
const { influencerController } = require('../controllers/influencerController');
const { influencerService } = require('../services/influencerService');
const influencerValid = require('../middlewares/influencerCreate');


describe('Influencer Create', () => {
  it('Deve criar influenciador com sucesso', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        category: 'Fashion',
        numberSubscribers: 10000,
        platform: 'YouTube',
        channelName: 'John Doe',
        description: 'Fashion influencer',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(influencerService, 'create').resolves({ code: StatusCodes.CREATED });

    await influencerController.create(req, res);

    expect(res.status.calledOnceWith(StatusCodes.CREATED)).to.be.true;
    expect(res.json.calledOnceWith({ message: 'Criado com sucesso' })).to.be.true;

    influencerService.create.restore();
  });

});

describe('validateCreate', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        category: 'Fashion',
        numberSubscribers: 10000,
        platform: 'YouTube',
        channelName: 'JohnDoe',
        description: 'Fashion influencer',
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  it('Deve chamar a próxima função se a validação passar', () => {
    influencerValid.validateBody(req, res, next);
    expect(next.called).to.be.true;
  });

  it('Deve retornar uma solicitação inválido e uma mensagem de erro se o nome estiver ausente', () => {
    req.body.name = '';
    influencerValid.validateBody(req, res, next);
    expect(res.status.calledWith(StatusCodes.BAD_REQUEST)).to.be.true;
    expect(res.json.calledWith({ message: 'O nome é obrigatório.' })).to.be.true;
  });

  it('Deve retornar uma solicitação inválido e uma mensagem de erro se o e-mail estiver ausente', () => {
    req.body.email = '';
    influencerValid.validateBody(req, res, next);
    expect(res.status.calledWith(StatusCodes.BAD_REQUEST)).to.be.true;
    expect(res.json.calledWith({ message: 'O e-mail deve ser válido e obrigatório.' })).to.be.true;
  });

  it('Deve retornar uma solicitação inválido e uma mensagem de erro se o category estiver ausente', () => {
    req.body.category = '';
    influencerValid.validateBody(req, res, next);
    expect(res.status.calledWith(StatusCodes.BAD_REQUEST)).to.be.true;
    expect(res.json.calledWith({ message: 'A categoria é obrigatória.' })).to.be.true;
  });

  it('Deve retornar uma solicitação inválido e uma mensagem de erro se o numberSubscribers estiver ausente', () => {
    req.body.numberSubscribers = '';
    influencerValid.validateBody(req, res, next);
    expect(res.status.calledWith(StatusCodes.BAD_REQUEST)).to.be.true;
    expect(res.json.calledWith({ message: 'O número de inscritos é obrigatório.' })).to.be.true;
  });

  it('Deve retornar uma solicitação inválido e uma mensagem de erro se o platform estiver ausente', () => {
    req.body.platform = '';
    influencerValid.validateBody(req, res, next);
    expect(res.status.calledWith(StatusCodes.BAD_REQUEST)).to.be.true;
    expect(res.json.calledWith({ message: 'A plataforma é obrigatória.' })).to.be.true;
  });

  it('Deve retornar uma solicitação inválido e uma mensagem de erro se o channelName estiver ausente', () => {
    req.body.channelName = '';
    influencerValid.validateBody(req, res, next);
    expect(res.status.calledWith(StatusCodes.BAD_REQUEST)).to.be.true;
    expect(res.json.calledWith({ message: 'O nome do canal é obrigatório.' })).to.be.true;
  });

  it('Deve retornar uma solicitação inválido e uma mensagem de erro se o description estiver ausente', () => {
    req.body.description = '';
    influencerValid.validateBody(req, res, next);
    expect(res.status.calledWith(StatusCodes.BAD_REQUEST)).to.be.true;
    expect(res.json.calledWith({ message: 'A descrição é obrigatória.' })).to.be.true;
  });

  it('Deve retornar uma solicitação inválido e uma mensagem de erro se o category estiver ausente', () => {
    req.body.category = '';
    influencerValid.validateBody(req, res, next);
    expect(res.status.calledWith(StatusCodes.BAD_REQUEST)).to.be.true;
    expect(res.json.calledWith({ message: 'A categoria é obrigatória.' })).to.be.true;
  });

  it('Deve retornar uma solicitação inválido e uma mensagem de erro se o email for inválido', () => {
    req.body.email = 'invalid_email';
    influencerValid.validateBody(req, res, next);
    expect(res.status.calledWith(StatusCodes.BAD_REQUEST)).to.be.true;
    expect(res.json.calledWith({ message: 'O e-mail deve ser válido e obrigatório.' })).to.be.true;
  });

  afterEach(() => {
    sinon.restore();
  });
});

describe('checkEmailAndName', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: 'johndoe@example.com',
        name: 'John Doe',
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  it('Deve chamar a próxima função se o e-mail e o nome não estiverem em uso', async () => {
    sinon.stub(Influencer, 'findOne').returns(null);
    await influencerValid.checkEmailAndName(req, res, next);
    expect(next.called).to.be.true;
  });

  it('deve retornar um código de status de conflito e uma mensagem de erro se o e-mail já estiver em uso', async () => {
    sinon.stub(Influencer, 'findOne').returns({ email: 'johndoe@example.com', name: 'John Doe', });
    await influencerValid.checkEmailAndName(req, res, next);
    expect(res.status.calledWith(StatusCodes.CONFLICT)).to.be.true;
    expect(res.json.calledWith({ message: 'O email ou name já está em uso.' })).to.be.true;
  });

  it('should return a conflict status code and error message if name is already in use', async () => {
    sinon.stub(Influencer, 'findOne').callsFake((query) => {
      if (query.where.name === req.body.name) {
        return { name: req.body.name };
      }
      return null;
    });

    await influencerValid.checkEmailAndName(req, res, next);

    expect(res.status.calledWith(StatusCodes.CONFLICT)).to.be.true;
    expect(res.json.calledWith({ message: 'O nome já está em uso.' })).to.be.true;
  });

  it('should return a conflict status code and error message if name is already in use', async () => {
    sinon.stub(Influencer, 'findOne').callsFake((query) => {
      if (query.where.email === req.body.email) {
        return { email: req.body.email };
      }
      return null;
    });

    await influencerValid.checkEmailAndName(req, res, next);

    expect(res.status.calledWith(StatusCodes.CONFLICT)).to.be.true;
    expect(res.json.calledWith({ message: 'O email já está em uso.' })).to.be.true;
  });

  afterEach(() => {
    sinon.restore();
  });
});