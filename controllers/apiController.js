let path = require('path');

let db = require(path.resolve('database', 'models', 'index'));


let gifResource = require('../request/gifResource') 

module.exports = {
  //busca todo
  list: function (req, res) {
    db.Peliculas.findAll(
        {
            include : [{association: 'Gene'},{association: 'Acto'} ]
        }
    )
      .then(function (resultados) {


        for (resultado of resultados) {
            resultado.setDataValue("endpoint", "/api/movies/" + resultado.id)
        }

        let respuesta = {
            meta: {
                status: 200,
                total: resultados.length,
                url: "/api/movies"
            },
            data: {
                resultados
            }
        }

        res.json(respuesta);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  find: function (req, res) {
    db.Peliculas.findByPk(req.params.id, 
        {
            include : [{association: 'Gene'},{association: 'Acto'} ]
        })
      .then(function (resultados) {
       resultados.setDataValue("endpoint", "/api/movies/" + resultados.id)


        let respuesta = {
            meta: {
                status: 200,
                total: resultados.length,
                url: "/api/movies"
            },
            data: {
                resultados
            }
        }

        res.json(respuesta);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  store: function (req, res) {
    db.Peliculas.create({
      title: req.body.title,
      length: req.body.length,
      awards: req.body.awards,
      rating: req.body.rating,
      release_date: req.body.release,
      genre_id: req.body.genre,
    })
      .then(function (resultados) {
        res.json(resultados);
      })
      .catch(function (error) {
        console.log(error);
      });
},
  pruebaAxios: function(req,res) {
    gifResource.random()
    .then(function(resultados) {
      res.send(resultados)
    })
    .catch(function(err) {
      console.log(err)
    })
  }
}