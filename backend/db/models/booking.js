'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.Spot, {foreignKey: 'spotId'});
      Booking.belongsTo(models.User, {foreignKey: 'userId'});
      // define association here
    }
  }
  Booking.init({
    spotId:  {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    userId:  {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    endDate:  {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

  }, {
    sequelize,
    modelName: 'Booking',
    scopes: {
      spotsRelated: {
        attributes: {
          exclude: ['id', 'userId', 'createdAt', 'updatedAt',]
        }
      }
    }
  });
  return Booking;
};
