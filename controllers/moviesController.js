let path = require('path');

let db = require(path.resolve('database', 'models', 'index'));
let sequelize = db.sequelize;

module.exports = {
  //busca todo
  list: function (req, res) {
    db.Peliculas.findAll({
    })
      .then(function (resultados) {
        console.log(resultados);
        res.send("peliculas")
        // res.render('listado', { listado: resultados });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  //busca por Id
  detail: function (req, res) {
    db.Peliculas.findByPk(req.params.id).then(function (resultados) {
      res.render('detalle', { searchById: resultados });
    });
  },
  animacion: function (req, res) {
    db.Peliculas.findAll({
      //al ser un objeto puedo poner varios filtros
      where: {
        genre_id: 7,
      },
    }).then(function (resultados) {
      console.log(resultados);
      res.render('animacion', { resultados });
    });
  },
  //busca y devuelve un solo resultado (el primero que devuelva la condición). Diferencia entre findOne y findAll (limit 1), es que findAll siempre nos va a devolver un array con todos los resultados sea 1 o 20. findOne devuelve un solo objeto con la fila de la base de datos que machee con la query
  uno: function (req, res) {
    db.Peliculas.findOne({
      where: {
        title: 'Toy Story',
      },
    })
      .then(function (resultados) {
        res.render('filtrado', { resultados });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  top: function (req, res) {
    db.Peliculas.findAll({
      where: {
        rating: { [db.Sequelize.Op.gt]: 8 },
      },
      order: [['title', 'Asc']],
      limit: 5,

      offset: 0,
    }).then(function (resultados) {
      res.render('top', { resultados });
    });
  },
  total: function (req, res) {
    db.Peliculas.sum('length').then(function (resultados) {
      res.render('total', { resultados });
    });
  },
  query: function (req, res) {
    sequelize.query('SELECT * FROM movies').then(function (resultados) {
      let pelicula = resultados[0];
      res.render('query', { pelicula });
    });
  },
  add: function (req, res) {
    res.render('add');
  },
  create: function (req, res) {
    db.Peliculas.create({
      title: req.body.title,
      length: req.body.length,
      awards: req.body.awards,
      rating: req.body.rating,
      release_date: req.body.release,
      create_at: req.body.create,
      update_at: req.body.update,
      genre_id: req.body.genre,
    })
      .then(function (resultados) {
        res.redirect('/movies');
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  edit: function (req, res) {
    res.render('editarPelicula', { resultados: {} });
  },
  update: function (req, res) {
    db.Peliculas.update(
      {
        title: req.body.title,
        length: req.body.length,
        awards: req.body.awards,
        rating: req.body.rating,
        release_date: req.body.release,
        create_at: req.body.create,
        update_at: req.body.update,
        genre_id: req.body.genre,
      },
      {
        where: {
          id: 2,
        },
      }
    )
      .then(function (resultado) {
        res.redirect('/movies');
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  delete: function (req, res) {
    db.Peliculas.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(function (resultadoDelete) {
        res.redirect('/movies');
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
