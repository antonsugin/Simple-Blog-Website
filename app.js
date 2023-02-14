const express = require("express");
const app = express();

const path = require("path");
const router = express.Router();

var bodyParser = require('body-parser')
// const ejs = require('ejs');


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, 'public/html');

// let title = '';
// let text = '';
// let read = '';

let blogItems = [];


// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }))


// router.use(express.urlencoded({ extended: false }));

router.get('/',function(req,res){
    
    res.render('blog', {blogs: blogItems});
    
    // res.sendFile(publicPath + '/index.html');

  });

router.get('/contact',function(req,res){

    res.render('contact');

    // res.sendFile(publicPath + '/contact.html');
    
  });

router.get('/about',function(req,res){

    res.render('about');

    // res.sendFile(publicPath + '/about.html');
    
  });

router.get('/compose',function(req,res){

    res.render('compose');

    // res.sendFile(publicPath + '/compose.html');
    
  });


// app.post("/", (req, res) => {


    

//     // res.redirect('/about');
// });

app.post("/compose", (req, res) => {

    let blogItemsObj = {
        'title' : '',
        'text' : '',
        'readMore' : 'Read More'
    }

    blogItemsObj.title = req.body.title;
    blogItemsObj.text = req.body.textarea;
    
    blogItems.push(blogItemsObj)

    console.log(req.body)

    res.redirect('/');
});

app.post("/about", (req, res) => {

    
})


app.set('view engine', 'ejs');

app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));
// router.use(express.urlencoded({ extended: true }));

app.listen(port, () => {

    console.log("Server started on port " + port);
});