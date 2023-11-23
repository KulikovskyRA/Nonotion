'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Todo.init(
    {
      inner: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      isDone: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Todo',
    }
  );
  return Todo;
};
