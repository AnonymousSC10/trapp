var express = require('express'),
    router = express.Router();


function view_index(req, res, next) {
    res.render('index')
}

/* GET home page */
router.get('/', view_index)

/* GET errors */
router.get('*', view_index)

module.exports = router