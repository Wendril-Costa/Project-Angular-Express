const { expect } = require('chai');
const sinon = require('sinon');
const path = require('path');
const { Sequelize } = require('sequelize');

// Configurar o ambiente de teste
process.env.NODE_ENV = 'test';

// Importar os modelos e a configuração do Sequelize
const sequelizeConfig = require('../../.sequelizerc');
const modelsPath = path.resolve(__dirname, '..', '..', sequelizeConfig['models-path']);
const configPath = sequelizeConfig.config;
const config = require(configPath).test;
const InfluencerModel = require(path.join(modelsPath, 'influencer.js'));

// Criar uma instância do Sequelize com a configuração do ambiente de teste
const sequelize = new Sequelize(config.database, config.username, config.password, config);
// Stub para as funções do modelo Influencer
const Influencer = sinon.stub(sequelize, 'define');
Influencer.returns(InfluencerModel(sequelize, Sequelize.DataTypes));

describe('Sequelize', () => {
  before(async () => {
    // Sincronizar o modelo com o banco de dados
    await sequelize.sync({ force: true });
  });

  after(() => {
    // Restaurar o stub do modelo Influencer
    Influencer.restore();
  });

  it('Deve criar a tabela Influencer no banco de dados', async () => {
    // Verificar se a tabela existe no banco de dados
    const tableExists = await sequelize.getQueryInterface().showAllTables()
      .then(tables => tables.includes('influencers'));

    expect(tableExists).to.be.true;
  });
});
