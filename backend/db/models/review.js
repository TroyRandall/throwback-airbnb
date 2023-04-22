'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, {foreignKey: 'userId'});
      Review.belongsTo(models.Spot, {foreignKey: 'spotId'});
      Review.hasMany(models.RevImage, {foreignKey: 'reviewId', as: 'ReviewImages'});
      // define association here
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spotId: {
     type: DataTypes.INTEGER,
    allowNull: false,
    },
    review: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
    stars:{
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1,
      max: 5,
    }
  }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
