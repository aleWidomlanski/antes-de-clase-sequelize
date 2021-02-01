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
    },
    release_date: {
      type: dataTypes.DATE,
    },
    genre_id: {
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
    tableName: 'movies',
    timestamps: true,
  };

  const Pelicula = sequelize.define(alias, columns, config);

  console.log(Pelicula)

 Pelicula.associate = function (models) {
    Pelicula.belongsTo(models.Genero, {
      as: 'generos',
      foreignKey: 'genre_id',
    });
    Pelicula.belongsToMany(models.Actor, {
      as: "Actors",
      throught: "actor_movie",
      foreignKey: 'movie_id',
      otherKey: "actor_id",
      timestamps: true
    }) 
  }; 

  return Pelicula;
};
