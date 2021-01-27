let path = require('path')

let db = require(path.resolve('.', 'models', 'index'))
let sequelize = db.sequelize;

module.exports = {
    //busca todo
    list: function (req, res) {
        db.Peliculas.findAll()
            .then(function (resultados) {
                console.log(resultados)
                res.render('listado', { listado: resultados })
            })
            .catch(function (error) {
                console.log(error)
            })
    },
    //busca por Id
    detail: function (req, res) {
        db.Peliculas.findByPk(req.params.id)
            .then(function (resultados) {
                res.render("detalle", { searchById: resultados })
            })
    },
    animacion: function (req, res) {
        db.Peliculas.findAll({
            //al ser un objeto puedo poner varios filtros
            where: {
                genre_id: 7,
            }
        })
            .then(function (resultados) {
                console.log(resultados)
                res.render('animacion', { resultados })
            })
    },
    //busca y devuelve un solo resultado (el primero que devuelva la condición). Diferencia entre findOne y findAll (limit 1), es que findAll siempre nos va a devolver un array con todos los resultados sea 1 o 20. findOne devuelve un solo objeto con la fila de la base de datos que machee con la query
    uno: function (req, res) {
        db.Peliculas.findOne({
            where: {
                title: "Toy Story"
            },
        })
            .then(function (resultados) {
                res.render("filtrado", { resultados })
            })
            .catch(function (error) {
                console.log(error)
            })
    },
    top: function (req, res) {
        db.Peliculas.findAll({
            where: {
                rating: { [db.Sequelize.Op.gt]: 8 }
            },
            order: [
                ["title", "Asc"]
            ],
            limit: 5,

            offset: 0
        })
            .then(function (resultados) {
                res.render('top', { resultados })
            })
    },
    total: function (req, res) {
        db.Peliculas.sum("length")
            .then(function (resultados) {
                res.render('total', { resultados })
            })
    },
    query: function (req, res) {
        sequelize.query("SELECT * FROM movies")
            .then(function (resultados) {
                let pelicula = resultados[0]
                res.render("query", { pelicula })
            })
    }
}




