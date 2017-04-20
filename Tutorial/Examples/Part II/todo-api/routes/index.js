var express = require('express');
var router = express.Router();

/**
 * @Verb GET
 * @Path index
 * @Action /home
 */
router.get('/', function (request, response) {
    response.render('index', {title: 'Express'});
});

module.exports = router;
