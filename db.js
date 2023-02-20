const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blogsDB");

/**{ useFindAndModify: false }) or true */

const blogsSchema = new mongoose.Schema({
    name: String,
    blog: String
});

const Blog = mongoose.model("Blog", blogsSchema);

const blog = new Blog({
     name: "Blog 1",
     blog: "lorem ipsum"
}); 

blog.save();