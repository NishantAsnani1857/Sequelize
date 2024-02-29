'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: true,
      }
      
    },
    roll_no:{
      type:DataTypes.INTEGER,
      validate:{
        min:1
      }
      
    },
    email:{
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }

    },
    password: DataTypes.STRING
  },
   {
    sequelize,
    timestamps: false,
    modelName: 'Student',
  });
  return Student;
};