const express = require("express");
const app = express();

const path = require("path");
const router = express.Router();

const _ = require('lodash');
const bodyParser = require('body-parser')
const ejs = require('ejs');


const port = process.env.PORT || 3000;
// const publicPath = path.join(__dirname, 'public/html');


let blogItems = [];


// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }))


// router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    
    res.render('blog', {blogs: blogItems});
    
    // res.sendFile(publicPath + '/index.html');

  });

router.get('/contact', (req, res) => {

    res.render('contact');
    
  });

router.get('/about', (req, res) => {

    res.render('about');
    
  });

router.get('/compose', (req, res) => {

    res.render('compose');
    
  });


  router.get("/posts/:topic", (req, res) => {

    let reqTitle = _.lowerCase(req.params.topic);

    blogItems.forEach(post => {
        
        let postTitle = _.lowerCase(post.title);

        if (reqTitle === postTitle) {

          res.render('post', {
            postTitle: post.title ,
            PostText: post.text
          });
            
        };
        
    })

  })


app.post("/compose", (req, res) => {

    const blogItemsObj = {
        'title' : '',
        'text' : '',
        'readMore' : 'Read More'
    }

    blogItemsObj.title = req.body.title;
    blogItemsObj.text = req.body.textarea;
    
    blogItems.push(blogItemsObj);

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