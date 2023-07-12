const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const url = 'http://localhost:3001'

describe('Teste de rota basica', () => {
  it('Deve Retornar um status 200 e uma mensagem "Ok"', async () => {
    const response = await chai.request(url).get('/');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Ok');
  });
});
