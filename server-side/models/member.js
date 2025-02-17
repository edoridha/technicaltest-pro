'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Member.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "fullname is required" },
        notEmpty: { msg: "fullname is required" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "email already taken" },
      validate: {
        isEmail: { msg: "Please enter a valid email address." },
        notNull: { msg: "email is required" },
        notEmpty: { msg: "email is required" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "password is required" },
        notEmpty: { msg: "password is required" }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "birthday is required" },
        notEmpty: { msg: "birthday is required" }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "gender is required" },
        notEmpty: { msg: "gender is required" }
      }
    }
  }, {
    sequelize,
    modelName: 'Member',
  });

  Member.beforeCreate((member, options) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(member.password, salt);
    member.password = hash;
  });
  return Member;
};