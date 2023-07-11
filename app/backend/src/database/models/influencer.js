module.exports = (sequelize, DataTypes) => {
    const Influencer = sequelize.define("Influencer",{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING
      },
      numberSubscribers: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      platform: {
        allowNull: false,
        type: DataTypes.STRING
      },
      channelName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nickName: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      },
      {
        timestamps: false,
        tableName: 'influencers'
      }
    );
  
    return Influencer;
  };
  
  
  
  