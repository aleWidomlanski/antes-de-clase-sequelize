var express = require('express');
var router = express.Router();
const moviesController = require("../controllers/moviesController")

/* GET users listing. */
router.get('/', moviesController.list);
router.get('/animacion', moviesController.animacion)
router.get('/filtrado', moviesController.uno)
router.get('/top', moviesController.top);
router.get('/totalTime', moviesController.total);
router.get('/query', moviesController.query);
router.get('/:id', moviesController.detail);

/* ;
;


*/
module.exports = router;
