const Pelicula = require("./Pelicula");

module.exports = function (sequelize, dataTypes) {
  let alias = 'Generos';

  let columns = {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false
    },
    ranking: {
      type: dataTypes.INTEGER,
      allowNull: false
    }
  };

  let config = {
    tableName: 'genres',
    timeStamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"

  };

  const Genero = sequelize.define(alias, columns, config);


  Genero.associate = function (models) {
    Genero.hasMany(models.Peliculas, {
      as: "peli",
      foreignKey: "genre_id"
    })
  }



  return Genero;
};
