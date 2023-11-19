'use strict';
const { Model } = require('sequelize');
const Profile = require('./profile');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Profile, { foreignKey: 'profile_id' });
      this.hasMany(models.Question, { foreignKey: 'user_id' });
      this.hasMany(models.QuestionAnswer, {
        foreignKey: 'user_id',
      });
      this.belongsToMany(models.User, { as: 'followings', through: 'Follow', foreignKey: 'following_id' });
      this.belongsToMany(models.User, { as: 'followers', through: 'Follow', foreignKey: 'follower_id' });
      // this.belongsToMany(this.User, { as: 'Followings', through: this.Follower, foreignKey: 'follower_id' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      profile_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: Profile,
          key: 'id',
        },
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: true,
    }
  );
  return User;
};
