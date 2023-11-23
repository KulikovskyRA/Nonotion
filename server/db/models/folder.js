'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Article }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(Article, { foreignKey: 'folderId' });
    }
  }
  Folder.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      isPublic: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Folder',
    }
  );
  return Folder;
};
