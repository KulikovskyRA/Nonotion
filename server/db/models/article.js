'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Folder }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Folder, { foreignKey: 'folderId' });
    }
  }
  Article.init(
    {
      title: DataTypes.STRING,
      textarea: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      folderId: DataTypes.INTEGER,
      isPublic: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Article',
    }
  );
  return Article;
};
