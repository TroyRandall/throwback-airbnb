'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RevImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RevImage.belongsTo(models.User, {foreignKey: 'userId'});
      RevImage.belongsTo(models.Review, {foreignKey: 'reviewId', as: 'ReviewImages'});
      // define association here
    }
  }
  RevImage.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId:  {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'RevImage',
    defaultScope: {
      attributes: {
        exclude: ['userId', 'reviewId', 'createdAt', 'updatedAt']
      }
    }
  });
  return RevImage;
};
