var express = require('express');
var router = express.Router();
var multer = require('multer');
var excelToJSON = require('excel-as-json').processFile;
var Database = require("./FirebaseConfig.js");



var upload = multer({ 
	dest : 'upload/',
	preservePath : true 
});

router.get('/', function(req, res, next) {
	res.render('uploadExcel',{
		title : 'Upload for Excel'
	});
});

router.post('/',upload.any(),function(req,res,next){
	var file = req.files;
	if(file.length == 0)
		res.send('No file selected');
	console.log(file[0]['path']);

	  var db = Database.database().ref('/products');
	excelToJSON(file[0]['path'],null,null,function(err,data){
		if(err)
			throw err;
		for(var i=0;i<data.length;i++)
		{
			db.push(data[i]);
		}
	})
	res.send('Data Uplaoded');
});

module.exports = router;