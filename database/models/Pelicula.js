module.exports = function (sequelize, dataTypes) {
  let alias = 'Peliculas'; //se suele poner de alias el nombre del modelo en plural

  let columns = {
    //columna que no aclare sequelize no recupera
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER,
    },
    title: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    length: {
      type: dataTypes.INTEGER,
    },
    awards: {
      type: dataTypes.INTEGER,
    },
    rating: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    release_date: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    genre_id: {
      type: dataTypes.INTEGER,
    },
    created_at: {
      type: dataTypes.DATE,
    },
    updated_at: {
      type: dataTypes.DATE,
    },
  };

  let config = {
    tableName: 'movies',
    timestamps: true,
  };

  const Pelicula = sequelize.define(alias, columns, config);

  Pelicula.associate = function (models) {
    Pelicula.belongsTo(models.Generos), {
      as: 'generos',
      foreignKey: 'genre_id'
    }
  }



  return Pelicula;
};
