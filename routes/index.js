var express = require('express');
var router = express.Router();

var apiController = require('../controllers/apiController')



/* GET home page. */
router.get('/', apiController.pruebaAxios);

module.exports = router;
