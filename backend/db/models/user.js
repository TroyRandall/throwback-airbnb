'use strict';
const { Model, Validator} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Spot, {foreignKey: 'ownerId', as: 'Owner'});
      User.hasMany(models.Booking, {foreignKey: 'userId'});
      User.hasMany(models.SpotImage, {foreignKey: 'userId'});
      User.hasMany(models.Review, {foreignKey: 'userId'});
      User.hasMany(models.RevImage, {foreignKey: 'userId'});
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("cannot be an email");
          }
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword:{
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      current: {
        attributes: {
          exclude: ["hashedPassword", "createdAt", "updatedAt"]
        }
      }
    }
  });
  return User;
};
