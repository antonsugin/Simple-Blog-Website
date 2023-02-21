const express = require("express");
const app = express();

const path = require("path");
const router = express.Router();

const _ = require('lodash');
const bodyParser = require('body-parser')
const ejs = require('ejs');

const mongoose = require('mongoose');


mongoose.set('strictQuery', true);
// mongoose.set('strictQuery', false)
const port = process.env.PORT || 3000;
// const publicPath = path.join(__dirname, 'public/html');

mongoose.connect("mongodb://localhost:27017/blogDB", () => {
  console.log("Connected to MongoDB");
});


const blogSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Blog = mongoose.model("Blog", blogSchema);

// let blogItems = [];


// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }))


router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    
  Blog.find({}, (err, blogs) => {
    console.log(blogs);
    res.render('blog', {
      // content:"",
      blogs: blogs
    });
  });
});



  // {blogs: blogItems}
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

    // let reqTitle = _.lowerCase(req.params.topic);
    const reqBlogId = req.params.blogId;

    Blog.findOne({_id: reqBlogId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });

    // blogItems.forEach(post => {
        
    //     let postTitle = _.lowerCase(post.title);

    //     if (reqTitle === postTitle) {

    //       res.render('post', {
    //         postTitle: post.title ,
    //         PostText: post.text
    //       });
            
    //     };
        
    // })

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
    // const blogItemsObj = {
    //     'title' : '',
    //     'text' : ''
    // }

    // blogItemsObj.title = req.body.title;
    // blogItemsObj.text = req.body.textarea;
    
    // blogItems.push(blogItemsObj);

    // res.redirect('/');
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



/**  const mongoPath = "C:\Program Files\MongoDB\Server\6.0\data\"; */







// const blog = new Blog({
//      name: "Blog 1",
//      blog: "lorem"
// }).save()



// mongoose.conn.close();
// .then(console.log)
// .then(() => {
//   return mongoose.conn.close();
// }); 


// Blog.remove({}, function(err) { 
//   console.log('collection removed') 
// });

// Blog.find((err, blogs) => {
//   if (err) {
//     console.log(err);
//   }
//   else {

//     // mongoose.connection.close(function () {
//     //   process.exit(0);
//     // });
//     // mongoose.connection.close(function () { console.log('Mongoose default connection closed'); });
//     // console.log(blogs);
//     // console.log(blogs.length)
    
//     // mongoose.connection.close(function () { console. log('Mongoose default connection closed'); });
//     // mongoose.connection.close();
//   }
// });

// Blog.find().then(doc => {
//   console.log(doc);
// }).then(() => {
//   mongoose.connection.close();
// });
// blog.inspect();

// blog.save();




// <!-- <%  blogs.forEach(function(blog){ %>

//   <section class="comment">
//       <h4 class="comment__header"><%= blog.title %></h4>
//       <p class="comment__txt"><%= blog.content.substring(0, 40) + " ..." %></p>
//       <a href="posts/<%= blog._id %>" class="read-more" >Read More</a>
//   </section>

// <% }) %> -->
  
// <!-- <% for (let i = 0; i < blogs.length; i++) { %>

//   <section class="comment">
//       <h4 class="comment__header"><%= blogs[i].title %></h4>
//       <p class="comment__txt"><%= blogs[i].text.substring(0, 40) + " ..." %></p>
//       <a href="posts/<%= blogs[i].title %>" class="read-more" >Read More</a>
//   </section>
// <% } %> -->
