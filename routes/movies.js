var express = require('express');
var router = express.Router();
const moviesController = require('../controllers/moviesController');

/* GET users listing. */
router.get('/', moviesController.list);
router.get('/animacion', moviesController.animacion);
router.get('/filtrado', moviesController.uno);
router.get('/top', moviesController.top);
router.get('/totalTime', moviesController.total);
router.get('/query', moviesController.query);
router.get('/add', moviesController.add);
router.post('/create', moviesController.create);
router.get('/pelis-genero', moviesController.relacionPeliGenero);
router.get('/genero-pelis', moviesController.relacionGeneroPelis);
router.get('/pelis-actores/:id', moviesController.relacionPeliActores)
router.get('/actores-pelis/:id', moviesController.relacionActoresEnPelis)
router.get('/edit/:id', moviesController.edit);
router.get('/:id', moviesController.detail);
router.put('/edit/:id', moviesController.update);
router.delete('/delete/:id', moviesController.delete);


module.exports = router;
