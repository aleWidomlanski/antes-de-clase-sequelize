module.exports = function (sequelize, dataTypes) {

    let alias = "Peliculas"; //se suele poner de alias el nombre del modelo en plural

    let columns = {  //columna que no aclare sequelize no recupera
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        length: {
            type: dataTypes.INTEGER
        },
        awards: {
            type: dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        },
        genre_id: {
            type: dataTypes.INTEGER
        }

    }

    let config = {
        tableName: "movies",
        timestamps: false
    }

    const Pelicula = sequelize.define(alias, columns, config)

    return Pelicula
}