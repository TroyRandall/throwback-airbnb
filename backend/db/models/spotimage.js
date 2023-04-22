'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SpotImage.belongsTo(models.User, {foreignKey: 'userId'});
      SpotImage.belongsTo(models.Spot, {foreignKey: 'spotId'});
      // define association here
    }
  }
  SpotImage.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    spotId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
