module.exports = function (sequelize, dataTypes) {
  let alias = 'Actores'; //se suele poner de alias el nombre del modelo en plural

  let columns = {
    //columna que no aclare sequelize no recupera
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    first_name: {
      type: dataTypes.STRING,
    },
    last_name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
    rating: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    favorite_movie_id: {
        type: dataTypes.INTEGER
    }
  };

  let config = {
    tableName: 'actors',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  };


  const Actor = sequelize.define(alias, columns, config);

  Actor.associate = function (models) {

    Actor.belongsToMany(models.Peliculas, {
      as:'Peli',
      through: 'actor_movie',
      foreignKey: 'actor_id',
      otherKey: 'movie_id',
      timestamps: false
    })
  }

  return Actor;
};
