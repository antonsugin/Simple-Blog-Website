const express = require("express");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {

    
    res.sendFile(__dirname + "/index.html");
});



app.post("/", (req, res) => {

    let simNum = Number(req.body.num1) + Number(req.body.num2);
    console.log(simNum)

    res.send(simNum.toString());
});



app.listen(3000, () => {

    console.log("Server started on port 3000");
});