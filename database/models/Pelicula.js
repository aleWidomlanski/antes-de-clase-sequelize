module.exports = function (sequelize, dataTypes) {
  let alias = 'Peliculas'; //se suele poner de alias el nombre del modelo en plural

  let columns = {
    //columna que no aclare sequelize no recupera
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER,
      allowNull: false
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
      allowNull: false,
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
    }
  };

  let config = {
    tableName: 'movies',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  };


  const Pelicula = sequelize.define(alias, columns, config);

  Pelicula.associate = function (models) {
    Pelicula.belongsTo(models.Generos, {
      as: "Gene",
      foreignKey: "genre_id"
    })

    Pelicula.belongsToMany(models.Actores, {
      as:'Acto',
      through: 'actor_movie',
      foreignKey: 'movie_id',
      otherKey: 'actor_id',
      timestamps: false
    })
  }



  return Pelicula;
};
