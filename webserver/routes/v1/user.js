var express = require('express');
var router = express.Router();

var controller = require('../../controllers/user')

/* API Welcome */
router.post('/create', controller.isUsernameTaken)
router.post('/create', controller.create);

module.exports = router;