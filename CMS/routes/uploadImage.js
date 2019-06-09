var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = require('@google-cloud/storage')({
	projectId: "nodejstofirebase.appspot.com",
	keyFilename : 'privatekey.json'
});

var upload = multer({ 
	dest : 'upload/',
	preservePath : true 
});


router.get('/', function(req, res, next) {
  res.render('uploadImage');
});

router.post('/',upload.any(),function(req,res,next){
	if(!req.files)
		return 'No files received';
	files = req.files;

	if(files.length == 0)
		res.send('No Folder Selected');

	for(var i=0;i<files.length;i++)
	{
		if(files[i].mimetype == "image/jpeg")
		{
			var file = files[i].path;
			var name = files[i].originalname;
			bankai(file,name);
		}
	}
	res.send('Uplaoded');
});

module.exports = router;

function bankai(file , name)
{
	var bucket = storage.bucket("nodejstofirebase.appspot.com");
	console.log(name+' '+file);
			bucket.upload(file,function(err,data){
				data.move(name,function(err,file){
					console.log('Image Uplaoded');
				});
			});
}