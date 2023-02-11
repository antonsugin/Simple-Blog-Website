const express = require("express");
const app = express();

const path = require("path");
const router = express.Router();

var bodyParser = require('body-parser')
// const ejs = require('ejs');


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, 'public/html');

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }))




router.get('/',function(req,res){
    
    // res.render('blog', {blogItem: 'FOO'});
    
    res.sendFile(publicPath + '/index.html');

  });

router.get('/contact',function(req,res){

    res.sendFile(publicPath + '/contact.html');
    
    // res.render("")
  });

  router.get('/about',function(req,res){

    

    // res.sendFile(publicPath + '/about.html');
    
  });

  router.get('/compose',function(req,res){

    res.sendFile(publicPath + '/compose.html');
    
  });


// app.post("/", (req, res) => {


    

//     // res.redirect('/about');
// });

app.post("/compose", (req, res) => {


    console.log(req.body.title)
    // console.log('hi')
    // console.log('h')

    res.redirect('/');
});

app.post("/about", (req, res) => {

    
})


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);
// app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {

    console.log("Server started on port " + port);
});