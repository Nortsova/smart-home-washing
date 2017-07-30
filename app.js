var express = require('express');
var multer  =   require('multer'); // for save images
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

app.use(express.static(__dirname + '/View')); 
//Store all HTML files in view folder.
app.use('/public', express.static('public'));
//Store all JS files in Scripts folder.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for correct reading data from html forms


// this script for load img
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage}).single('userPhoto');

 

// first page
app.get('/', function (req, res) {
  res.sendFile('View/index.html');
});

// for open each saved image 
app.get('/uploads/:upId', function(req,res){
    var url = path.join(__dirname, 'public/uploads/' + req.params.upId );
    var file = fs.readFileSync(url, 'binary');

  res.setHeader('Content-Length', file.length);
  res.setHeader('Content-Type', 'image/png');
  res.write(file, 'binary');
  res.end();
});

// for save data from forms
app.post('/login', function (req, res) {
  // >>>>>>>>. this code for images
    upload(req,res,function(err) {
        if(err) {
          console.log(err);
            return res.end("Error uploading file.");
        }


        var imageName = req.file.filename;

        // this code for save image name in array, it used when we open each image
        fs.readFile('./public/images.json', 'utf8', function readFileCallback(err, data){
          if (err){
              console.log(err);
              res.send({ status: 'error' });
          } else {
          obj = JSON.parse(data); //now it an object
          obj.table.push(imageName); //add some data
          json = JSON.stringify(obj); //convert it back to json
          fs.writeFile('./public/images.json', json, 'utf8', function() {

            // res.send({ status: 'SUCCESS' });
            console.log('save');
          }); // write it back 
        }});
        res.end("File is uploaded");
    });


    // >>>>>>>>>>> this code for data from forms
// ------------------------------------------
  // fs.readFile('./public/data.json', 'utf8', function readFileCallback(err, data){
  //   if (err){
  //       console.log(err);
  //       res.send({ status: 'error' });
  //   } else {
  //   obj = JSON.parse(data); //now it an object
  //   obj.table.push(req.body); //add some data
  //   json = JSON.stringify(obj); //convert it back to json
  //   fs.writeFile('./public/data.json', json, 'utf8', function() {

  //     res.send({ status: 'SUCCESS' });
  //     console.log('save');
  //   }); // write it back 
  // }});
});

// this route for open all saved image
app.get('/uploads', function(req,res){
  res.writeHead(200,{"Content-Type" : "text/html"});

  // here we used the array with images name
  fs.readFile('./public/images.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    var imgArray = obj.table;

    imgArray.forEach(item => {
      console.log(path);
      let url = 'uploads/' + item;
      res.write("<img src="+url +" />");
    });

  res.end();
  }});
});


app.listen(9000, function () {
  console.log('Example app listening on port 9000!');
});