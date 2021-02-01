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
    updated_at: {
      type: dataTypes.DATE,
    },
    created_at: {
      type: dataTypes.DATE,
    }
  };

  let config = {
    tableName: 'genres',
    timeStamps: true,
  };

  const Genero = sequelize.define(alias, columns, config);


  Genero.associate = function (models) {
    Genero.hasMany(models.Peliculas), {
      as: 'peliculas',
      foreignKey: 'genre_id'
    }
  }




  return Genero;
};
