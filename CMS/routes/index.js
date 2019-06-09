var express = require('express');
var router = express.Router();
var rimraf = require('rimraf');
var fs = require('fs');

router.get('/', function(req, res, next) {
	rimraf('upload',function(){
		fs.mkdir('upload',function(){});
		res.render('index', { title: 'TioTime-CMS' });
	});
});
module.exports = router;