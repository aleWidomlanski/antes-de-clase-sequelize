module.exports = function (sequelize, dataTypes) {
  let alias = 'Generos';

  let columns = {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER,
    },
    name: {
      type: dataTypes.STRING,
    },
    ranking: {
      type: dataTypes.INTEGER,
    },
    created_at: {
      type: dataTypes.INTEGER,
    },
    update_at: {
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tableName: 'genres',
    timeStamps: true,
  };

  const Genero = sequelize.define(alias, columns, config);

console.log(Genero)

  Genero.associate = function (models) {
    Genero.hasMany(models.Pelicula, {
      as: 'peliculas',
      foreignKey: 'genre_id',
    });
  };


  


  return Genero;
};
