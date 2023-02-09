const express = require("express");
const app = express();

const path = require("path");
const router = express.Router();

const port = process.env.PORT || 3000;



// app.get("/", (req, res) => {

    
//     res.sendFile(__dirname + "/index.html");

//     // res.render();!!!!!!
// });

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname +'/index.html'));
    //__dirname : It will resolve to your project folder.
  });

router.get('/contact',function(req,res){
    res.sendFile(path.join(__dirname +'/contact.html'));

    // console.log(path.join(__dirname +'/contact.html'))
    // res.render("")
  });

  router.get('/about',function(req,res){
    res.sendFile(path.join(__dirname +'/about.html'));
  });


app.post("/", (req, res) => {

    let simNum = Number(req.body.num1) + Number(req.body.num2);
    console.log(simNum)

    res.send(simNum.toString());

    // res.redirect('/');!!!!!!
});




app.use('/', router);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => {

    console.log("Server started on port " + port);
});