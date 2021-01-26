var express = require('express');
var router = express.Router();
const moviesController = require("../controllers/moviesController")

/* GET users listing. */
router.get('/', moviesController.list);
router.get('/:id', moviesController.detail);
/* router.get('/filtrado', moviesController.uno);
router.get('/drama', moviesController.drama);
router.get('/top', moviesController.top);
router.get('/totalTime', moviesController.total);
*/
module.exports = router;
