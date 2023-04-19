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
      RevImage.belongsTo(models.Review, {foreignKey: 'reviewId'});
      // define association here
    }
  }
  RevImage.init({
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
  });
  return RevImage;
};