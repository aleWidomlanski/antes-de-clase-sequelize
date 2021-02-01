module.exports = function (sequelize, dataTypes) {
  let alias = 'Actores'; //se suele poner de alias el nombre del modelo en plural

  let columns = {
    //columna que no aclare sequelize no recupera
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER,
    },
    firstName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    last_name: {
        type: dataTypes.STRING,
      },
    favorite_movie_id: {
      type: dataTypes.INTEGER,
    },
    rating: {
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
    tableName: 'actors',
    timestamps: true,
  };

  const Actor = sequelize.define(alias, columns, config);

  console.log(Pelicula)

  Actor.associate = function (models) {
        Actor.belongsToMany(models.Pelicula, {
        as: "peliculas",
        throught: "actor_movie",
        foreignKey: 'actor_id',
        otherKey: "movie_id",
        timestamps: true
      }) 
    }; 
    return Actor;
  };
