'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questioner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Questioner.init(
    {
      questioner: DataTypes.STRING,
      id_category_questioner: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Questioner',
      tableName: 'Questioners',
      underscored: true,
    }
  );
  return Questioner;
};
