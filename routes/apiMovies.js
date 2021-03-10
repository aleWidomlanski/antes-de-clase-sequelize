var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController');

/* GET users listing. */
router.get('/', apiController.list);
router.post('/', apiController.store);
router.get('/:id', apiController.find);





module.exports = router;
