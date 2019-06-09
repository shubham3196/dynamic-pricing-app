var express = require('express');
var router = express.Router();
var Database = require('./FirebaseConfig.js');
var multer = require('multer');
var storage = require('@google-cloud/storage')({
	projectId: "nodejstofirebase.appspot.com",
	keyFilename : 'privatekey.json'
});

var upload = multer({ 
	dest : 'upload/',
	preservePath : true 
});

var config = {
    apiKey: "AIzaSyBSwopfdHBD73gGOAjf-DJm0dq9j0HaLBo",
    authDomain: "nodejstofirebase.firebaseapp.com",
    databaseURL: "https://nodejstofirebase.firebaseio.com",
    projectId: "nodejstofirebase",
    storageBucket: "nodejstofirebase.appspot.com",
    messagingSenderId: "279800640313"
  };

router.get('/', function(req, res, next) {

	var key = req.query.key;
	console.log(key);
	var db = Database.database().ref('/products/'+key);
	db.on('value',function(snap){
			res.render('product', {
			title: 'Edit Product' , 
			key : key,
			data : snap.val(),
			app : config
		});
	});
});

router.post('/',upload.any(),function(req,res){
	var body = req.body;
	var file = req.files;
	console.log(body);
	console.log(file.length);
	var ref = Database.database().ref('/products/'+body.key);
	var img = body.Images;
	if(file.length != 0)
	{
		var bucket = storage.bucket("nodejstofirebase.appspot.com");
		bucket.file(img).delete().then(function(){
			console.log('Image Deleted');
		});
		var nimg = 'Images/'+body.Product_ID+'.jpg';
		bucket.upload(file[0].path,function(err,data){
			console.log('Here');
			data.move(nimg,function(err,file){
				console.log('Image Uploaded');
				ref.set({
				Colour : body.Colour,
				Deal : body.Deal,
				Name : body.Name,
				Price : body.Price,
				Product_ID : body.Product_ID,
				Size : body.Size,
				Stock : body.Stock,
				Images : nimg
				});
			});
		});
	}
	else
	{
		ref.set({
				Colour : body.Colour,
				Deal : body.Deal,
				Name : body.Name,
				Price : body.Price,
				Product_ID : body.Product_ID,
				Size : body.Size,
				Stock : body.Stock,
				Images : img
				});	
	}
	res.send("Updated!");
});

module.exports = router;