const express = require("express");
const app = express();

const path = require("path");
const router = express.Router();

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, 'public/html');


const target = new EventTarget();

target.addEventListener('click', (event) => {
  console.log('foo event happened!');
});



router.get('/',function(req,res){
    
    console.log(target.addEventListener)
    
    res.sendFile(publicPath + '/index.html');

  });

router.get('/contact',function(req,res){

    res.sendFile(publicPath + '/contact.html');
    
    // res.render("")
  });

  router.get('/about',function(req,res){

    document.getElementById("about").addEventListener("click", () => {
        console.log('hi')
        // res.redirect("/about");
        res.sendFile(publicPath + '/about.html');
    })

    // res.sendFile(publicPath + '/about.html');
    
  });

  router.get('/compose',function(req,res){

    res.sendFile(publicPath + '/compose.html');
    
  });


app.post("/", (req, res) => {


    let simNum = Number(req.body.num1) + Number(req.body.num2);
    console.log(simNum)

    res.send(simNum.toString());

    // res.redirect('/');!!!!!!
});

app.post("/about", (req, res) => {

    document.getElementById("about").addEventListener("click", () => {
        res.redirect("/about");
    })

    // res.redirect("/about");
})



app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {

    console.log("Server started on port " + port);
});