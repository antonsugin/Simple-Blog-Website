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
        'text' : ''
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



/**  const mongoPath = "C:\Program Files\MongoDB\Server\6.0\data\"; */

const mongoose = require('mongoose');

mongoose.set('strictQuery', true); /** True */
mongoose.connect("mongodb://localhost:27017/blogsDB", () => {
  console.log("Connected to MongoDB");
});

// mongoose.connect("mongodb://localhost:27017/blogsDB", { useMongoClient: true });

/**{ useFindAndModify: false }) or true */


// mongoose.connect(Config.mongo_db_connection_string);

// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URL, () => {
//   console.log("Connected to MongoDB");
// });

const blogsSchema = new mongoose.Schema({
    name: String,
    blog: String
});

const Blog = mongoose.model("Blog", blogsSchema);

const blog = new Blog({
     name: "Blog 1",
     blog: "lorem"
}).save()



// mongoose.conn.close();
// .then(console.log)
// .then(() => {
//   return mongoose.conn.close();
// }); 


// Blog.remove({}, function(err) { 
//   console.log('collection removed') 
// });

Blog.find((err, blogs) => {
  if (err) {
    console.log(err);
  }
  else {

    // mongoose.connection.close(function () {
    //   process.exit(0);
    // });
    // mongoose.connection.close(function () { console.log('Mongoose default connection closed'); });
    // console.log(blogs);
    // console.log(blogs.length)
    
    // mongoose.connection.close(function () { console. log('Mongoose default connection closed'); });
    // mongoose.connection.close();
  }
});

// Blog.find().then(doc => {
//   console.log(doc);
// }).then(() => {
//   mongoose.connection.close();
// });
// blog.inspect();

// blog.save();