let path = require('path')
/* let sequelize = db.sequelize; */
let db = require(path.resolve('.', 'models', 'index'))

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
    /* drama: function (req, res) {
      db.Peliculas.findAll({
          //al ser un objeto puedo poner varios filtros

      }

      )
          .then(function (resultados) {
              res.render('index', { resultados })
          })
  },
  //busca y devuelve un solo resultado (el primero que devuelva la condición). Diferencia entre findOne y findAll (limit 1), es que findAll siempre nos va a devolver un array con todos los resultados sea 1 o 20. findOne devuelve un solo objeto con la fila de la base de datos que machee con la query
  uno: function (req, res) {
      db.Peliculas.findOne({
          where: {
              name: "Toy Story"
          }
      })
          .then(function (resultados) {
              res.render("index", { resultados })
          })
          .catch(function (error) {
              console.log(error)
          })
  },
  top: function (req, res) {
      db.Peliculas.findAll({
          where: {
              rating: {
                  [db.Sequelize.Op.gt]: 8  //esto sería rating mayor a 8
              },
              order: [
                  ["rating", "DESC"],
                  ["title", "DESC"]
              ],
              limit: 5,
              offset: 5
          }
      })
          .then(function (resultados) {
              res.render('index', { resultados })
          })
  },
  total: function (req, res) {
      db.Peliculas.sum("length")
          .then(function (resultados) {
              console.log(resultados)
          })
  },
  query: function (req, res) {
      sequelize.query(SELECT * FROM movies)
          .then(function (resultados) {
              let pelicula = resultados[0]
              console.log(pelicula)
          })
  } */
}




