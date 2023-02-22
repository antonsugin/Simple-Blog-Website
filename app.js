const express = require("express");
const app = express();

const path = require("path");
const router = express.Router();

const _ = require('lodash');
const bodyParser = require('body-parser')
const ejs = require('ejs');

const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/blogDB", () => {
  console.log("Connected to MongoDB");
});


const blogSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Blog = mongoose.model("Blog", blogSchema);


router.get('/', (req, res) => {
    
  Blog.find({}, (err, blogs) => {
    res.render('blog', {
      blogs: blogs
    });
  });

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


router.get("/posts/:blogId", (req, res) => {

  const reqBlogId = req.params.blogId;

  Blog.findOne({_id: reqBlogId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

})


app.post("/compose", (req, res) => {

  const blog = new Blog ({
    title: req.body.title,
    content: req.body.textarea
  })

  blog.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {

    console.log("Server started on port " + port);
});